<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Models\Email;
use App\Models\General;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('site/contact');
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $general = General::first();
        $serverMail = Email::first();

        $messages = [
            'required' => 'O campo :attribute é obrigatório!',
            'email' => 'O :attribute é inválido!'
        ];
        $request->validate(
            [
                'name' => 'required',
                'email' => 'email|required',
                'message' => 'required'
            ],
            $messages
        );

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = 0;                       //Enable verbose debug output
            $mail->isSMTP();
            $mail->CharSet   = 'UTF-8';                 //Send using SMTP
            $mail->Host       = $serverMail->host;                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                   //Enable SMTP authentication
            $mail->Username   = $serverMail->user;    //SMTP username
            $mail->Password   = $serverMail->password;      //SMTP password
            $mail->SMTPSecure = $serverMail->security == 'TLS' ?
                PHPMailer::ENCRYPTION_STARTTLS :
                PHPMailer::ENCRYPTION_SMTPS;               //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = $serverMail->port;      //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

            //Recipients
            $mail->setFrom($request->email, $request->name);
            $mail->addAddress($serverMail->user);     //Add a recipient

            $logoimg = $general->logo ? public_path('storage/images/' . $general->logo) : public_path('storage/images/padrao.jpg');
            $mail->AddEmbeddedImage($logoimg, 'logoimg', $logoimg);

            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = "Mensagem do formulário de contato do site!";
            $mail->AltBody = 'Para conseguir essa e-mail corretamente, use um visualizador de e-mail com suporte a HTML';
            $mail->MsgHTML($request->message);
            if (!$mail->send()) {
                Session::flash('error', 'E-mail não enviado!');
                return redirect()->route('contato');
            } else {
                Session::flash('success', 'Obrigado, E-mail enviado com sucesso. Aguarde contato!');
                return redirect()->route('contato');
            }
        } catch (Exception $e) {
            Session::flash('error', 'O e-mail não foi enviado corretamente provável falha do servidor!');
            return redirect()->route('contato');
        }
    }
}
