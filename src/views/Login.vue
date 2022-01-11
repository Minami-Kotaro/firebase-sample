<template>
  <div class="height-100 d-flex align-center justify-center">
    <v-card width="800">
      <v-toolbar color="green" dark>
        <v-toolbar-title>LOGIN</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form class="styled-input">
          <v-text-field v-model="mail" label="Mail" type="text" />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            @keyup.enter="handleClickLogin()"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="gray"
          outlined
          large
          block
          rounded
          @click="handleClickLogin()"
        >
          <div>ログイン</div>
          <div class="btn-spacer" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import LoginModule from "@/store/modules/login";
@Component({
  components: {},
})
export default class extends Vue {
  get mail(): string {
    return LoginModule.loginForm.mail;
  }
  set mail(data: string) {
    LoginModule.inputLoginForm({
      mail: data,
      password: this.password,
    });
  }
  get password(): string {
    return LoginModule.loginForm.password;
  }
  set password(data: string) {
    LoginModule.inputLoginForm({
      mail: this.mail,
      password: data,
    });
  }

  handleClickLogin(): void {
    LoginModule.Login();
  }
}
</script>
