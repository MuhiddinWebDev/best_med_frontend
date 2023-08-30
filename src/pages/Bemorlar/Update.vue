<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <bemor-form></bemor-form>
          </b-container>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import BemorForm from "./Form.vue";
export default {
  name: "BemorUpdate",
  components: {
    BemorForm
  }
};
</script>
<style></style>
