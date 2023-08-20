/**
 *
 */

const app = Vue.createApp({
  components: {},
  data: function () {
    return {
      findUserName: "",
      findPassword: "",

      loginMessage: "",
    };
  },
  methods: {
    callCheckUser: function () {
      let request = {
        userName: this.findUserName,
        password: this.findPassword,
      };
      let pika = this;
      axios
        .post(contextPath + "/members/checkUser", request)
        .then(function (response) {
          console.log("response", response);
          pika.loginMessage = response.data.message;
          let result = response.data.success;
          if (result === true) {
            localStorage.setItem('UserName', response.data.members.userName);
            localStorage.setItem('MembersId', response.data.members.membersId);
            localStorage.setItem('RoleId', response.data.members.roleId);
            let memberName=response.data.members.firstName+response.data.members.lastName
            localStorage.setItem('MemberName', memberName);
            
            bootbox.alert({
              title: "提醒！",
              message:
                '<div class="text-center">' + pika.loginMessage + "</div>",
              buttons: {
                ok: { label: "關閉", className: "btn btn-warning" },
              },
              callback: function () {
                const url = contextPath + "/";
                window.location.href = url;
              },
            });
          } else {
            bootbox.alert({
              title: "提醒！",
              message:
                '<div class="text-center">' + pika.loginMessage + "</div>",
              buttons: {
                ok: { label: "重新登入", className: "btn btn-warning" },
              },
            });
          }
        })
        .catch(function () {})
        .finally(function () {});
    },
  },
  mounted: function () {
  },
});

app.mount("#app");
