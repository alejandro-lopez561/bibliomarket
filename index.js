const { createApp } = Vue

  createApp({
    data() {
      return {
        contentData: data,
        templatePage:"homePage",
        formulario: {
          nombre: '',
          celular: '',
          correo: '',
          direccion: '',
          comentarios: ''
        },
        mostrarMensaje: false,
        ocultarFormulario: false
      }
    },
    mounted() {
      var hashUrl=window.location.hash;
      this.idUrl(hashUrl.replace('#', ''));
      this.loadContentFromHash();
      window.addEventListener('hashchange', this.loadContentFromHash);
    },
    beforeDestroy() {
      window.removeEventListener('hashchange', this.loadContentFromHash);
    },
    methods: {
      submitForm() {
        this.mostrarMensaje = true;
        this.ocultarFormulario = true;
      },
      loadContentFromHash() {
        const hash = window.location.hash.replace('#', '');
        this.idUrl(hash);
      },
      idUrl(hashUrl) {
        $('.nav-link').removeClass('active');
        window.location.hash = hashUrl;
        switch (hashUrl.toLowerCase()) {
          case "catalogo":
            this.templatePage="catalogo";
            setTimeout(() => {
              $('#catalogue').addClass('active');
            }, "250");
          break;
          case "solicitudes":
            this.templatePage="solicitudes";
            setTimeout(() => {
              $('#requests').addClass('active');
            }, "250");
          break;
          default:
            this.templatePage="homePage";
            $('#Home').addClass('active');
        };
      },
      navigateTo(hash) {
        window.location.hash = hash;
      },
    }
  }).mount('#app')