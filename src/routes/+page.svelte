<script>
    import logo from "../lib/img/logo.svg";
</script>

<svelte:head>
	<title>GBS</title>
	<meta name="description" content="GBS" />
	<link rel="manifest" href="/manifest.json">
</svelte:head>

<h1 class="text-3xl font-bold text-center">Welcome to GBS</h1>
<img src={logo} alt="Logo" class="fixed-logo" />
<style>
    
    h1 {
        text-align: center;
        margin-top: 20px;
    }

    .fixed-logo {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 450px;
        height: auto;
    }


    @media (max-width: 600px) {
        .fixed-logo {
            width: 200px;
        }
    }
</style>