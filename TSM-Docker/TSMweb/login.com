<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>login tsm</title>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
    }

    body {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(310deg, black, gray, white);
    }

    .login-container {
        width: 350px;
        padding: 30px;
        background: rgba(0,0,0,0,16);
        backdrop-filter: blur(12px);
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        animation: fadeIn 0.8s ease;
    }

    h2 {
        text-align: center;
        margin-bottom: 25px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    input {
        width: 100%;
        padding: 12px;
        border-radius: 10px;
        border: 1px solid grey;
        font-size: 15px;
        transition: 0.25s;
    }

    input:focus {
        border-color: #3a7bd5;
        box-shadow: 0 0 8px rgba(58,123,213,0.3);
        outline: none;
    }

    button {
        width: 100%;
        padding: 12px;
        border: none;
        font-size: 16px;
        background: black;
        color: white;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.25s;
    }

    button:hover {
        background: gray;
        box-shadow: black;
    }

    .text-center {
        text-align: center;
        margin-top: 15px;
        font-size: 14px;
    }
    
    .logo-box {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
}

.logo {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.5);
    backdrop-filter: blur(5px);
}
    
    .web-title {
    text-align: center;
    font-size: 26px;
    font-family: serif;
    font-weight: bold;
    margin-bottom: 10px;
    color: linear-gradient(45deg, red, white, black);
}

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 0; transform: translateY(0); }
    }
    
.logo-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.7s ease;
    opacity: 1;
}


.logo-box.move-up {
    top: 70px;
    transform: translateX(-50%);
}


.login-container {
    opacity: 0;
    transform: translateY(30px);
    transition: 0.8s ease;
}


.login-container.show {
    opacity: 1;
    transform: translateY(0);
}
    
    .text-center{
        text-decoration: none;
    }
    
</style>

</head>
<body>
    <div class="logo-box">
    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJ0V2KWXJNcXf8L68z_mdJ_jZAfwBvEVnUrnIF74ZhP_dyNMrPTrOKaj_UgLAiqyKus9ZW74dOedAo-J9KFqhewdCZLMcLsiPMPP3pje2e0Q_2IcLekTnMH-HMLe1EZKQi3hyphenhyphengsko6oZ1qdQrltG19u_MuQjyyESCVWAKTkfpVkGpEW9P_7KYUR7XPNUEn/s320/e14b92a9-291d-414e-af98-660f1a368ceb-copied-media~2.jpg" alt="Logo" class="logo">
</div>
    
<div class="login-container">
    
    <h1 class="web-title">TSMweb</h1>
    <h2>Login</h2>

    <div class="form-group">
        <input type="text" placeholder="Username" required>
    </div>

    <div class="form-group">
        <input type="password" placeholder="Password" required>
    </div>

    <button onclick="login()">Masuk</button>

    <p class="text-center">Belum punya akun? <a href="#">Daftar</a></p>
</div>

<script>
window.onload = function() {
    setTimeout(() => {
        document.querySelector('.logo-box').classList.add('move-up');
        document.querySelector('.login-container').classList.add('show');
    }, 1000);
}

function login() {
    alert("Daftar dulu bang");
}
</script>

</body>
</html>
