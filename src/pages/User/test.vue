<script>
export default {
  methods: {
    async print() {
      let self = this;
      self.CheckOperator();
      if (self.checkOperator == false) {
        self.printing = true;

        if (self.$route.path == "/patient/create") {
          var methods = "post";
          var action = "api/registration";
        } else {
          var methods = "patch";
          var action = "api/registration/id/" + self.$route.params.id;
        }
        try {
          const response = await self.axios({
            method: methods,
            url: action,
            data: self.data
          });
          if (response) {
            try {
              const response1 = await self.axios.get(
                "api/registration/queue/patient/" + self.data.patient_id
              );
              localStorage.setItem("printData", JSON.stringify(response1.data));
              const route = self.$router.resolve({
                path: "/patient/checkprint"
              });
              window.open(route.href, "_blank");
            } catch (error) {}
          }
          self.$router.push({ path: "/patient/index" });
        } catch (error) {}
        self.printing = false;
      }
    }
  }
};
</script>
