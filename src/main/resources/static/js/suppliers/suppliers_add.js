/**
 *
 */

const app = Vue.createApp({
  components: {},
  data: function () {
    return {
      findMembersId: "",
      findSuppliersName: "",
      findTaxId: "",
      findPhone: "",
      findAddress: "",
      findLogistics: "黑貓宅配",
      findSigningDate: "",
      findContractEndDate: "",
      findBoss: "",
      findContactPerson: "",
      findPhoneNumber: "",
      findEmail: "",
      findRemarks: "",

      addMessage: "",

      membersData: [],

      userName: "",
      firstName: "",
      lastName: "",

      reply: "請選擇會員帳號",
      signingDateMessage: "",
      contractEndDateMessage: "",
    };
  },
  methods: {
    //簽約日不早於系統日
    checkSigningDate: function () {
      const today = new Date(); // 获取当前系统日期
      const signingDate = new Date(this.findSigningDate); // 将输入的签约日期转换为日期对象

      // 比较签约日期是否在今天之后
      if (signingDate > today) {
        this.signingDateMessage = "簽約日期不得晚於系統日";
      } else {
        this.signingDateMessage = ""; // 清空消息
      }

      const contractEndDate = new Date(this.findContractEndDate); // 将输入的签约日期转换为日期对象

      // 比较起迄日
      if (contractEndDate < signingDate) {
        this.contractEndDateMessage = "契約到期日不得早於簽約日期";
      } else {
        this.contractEndDateMessage = ""; // 清空消息
      }
    },

    //到期日不能早於簽約日
    checkContractEndDate: function () {
      const signingDate = new Date(this.findSigningDate); // 将输入的签约日期转换为日期对象
      const contractEndDate = new Date(this.findContractEndDate); // 将输入的签约日期转换为日期对象

      // 比较日期
      if (contractEndDate < signingDate) {
        this.contractEndDateMessage = "契約到期日不得早於簽約日期";
      } else {
        this.contractEndDateMessage = ""; // 清空消息
      }
    },

    //選擇會員帳號後，後方顯示對應會員的名稱
    callFindByMembersIdForContractsAdd: function () {
      let membersId = this.findMembersId;

      if (membersId === "") {
        let pika = this;
        pika.reply = "請選擇會員帳號";
      } else {
        let request = {
          membersId,
        };
        let pika = this;
        axios
          .post(
            contextPath + "/members/findByMembersIdForContractsAdd",
            request
          )
          .then(function (response) {
            pika.userName = response.data.userName;
            pika.firstName = response.data.firstName;
            pika.lastName = response.data.lastName;
            pika.reply = "會員姓名： " + pika.firstName + pika.lastName;
          })
          .catch(function () {})
          .finally(function () {});
      }
    },

    //新增廠商
    callAddSuppliers: function () {
      const signingDate = new Date(this.findSigningDate);
      const contractEndDate = new Date(this.findContractEndDate);
      const today = new Date();
      //如果日期有誤，沒有修改，就不能新增
      if (signingDate > today || contractEndDate < signingDate) {
        bootbox.alert({
          title: "提醒！",
          message:
            '<div class="text-center">欄位有誤尚未修正(請調整有紅字提示之欄位)</div>',
          buttons: {
            ok: { label: "關閉", className: "btn btn-warning" },
          },
        });
      }
      //如果有欄位沒有填，就不能新增
      else if (
        this.findMembersId === "" ||
        this.findSuppliersName === "" ||
        this.findTaxId === "" ||
        this.findSigningDate === "" ||
        this.findContractEndDate === "" ||
        this.findBoss === "" ||
        this.findContactPerson === "" ||
        this.findPhoneNumber === "" ||
        this.findEmail === ""
      ) {
        bootbox.alert({
          title: "提醒！",
          message: '<div class="text-center">還有欄位沒有填寫唷！</div>',
          buttons: {
            ok: { label: "關閉", className: "btn btn-warning" },
          },
        });
      } else {
        let request = {
          membersId: this.findMembersId,
          suppliersName: this.findSuppliersName,
          taxId: this.findTaxId,
          phone: this.findPhone,
          address: this.findAddress,
          logistics: this.findLogistics,
          signingDate: this.findSigningDate,
          contractEndDate: this.findContractEndDate,
          boss: this.findBoss,
          contactPerson: this.findContactPerson,
          phoneNumber: this.findPhoneNumber,
          email: this.findEmail,
          remarks: this.findRemarks,
        };
        let pika = this;
        axios
          .post(contextPath + "/suppliers/addSuppliers", request)
          .then(function (response) {
            pika.addMessage = response.data;

            bootbox.confirm({
              title: "訊息！",
              message: '<div class="text-center">' + pika.addMessage + "</div>",
              buttons: {
                confirm: {
                  label: "確認",
                  className: "btn-success",
                },
                cancel: {
                  label: "繼續新增",
                  className: "btn-danger",
                },
              },
              callback: function (result) {
                if (result) {
                  // 点击了"確認"按钮，跳转到/showSupplierPage
                  window.location.href = "/buyallgoods/showSupplierPage";
                } else {
                  // 点击了"繼續新增"按钮，清空输入框的值
                  pika.findMembersId = "";
                  pika.findSuppliersName = "";
                  pika.findTaxId = "";
                  pika.findPhone = "";
                  pika.findAddress = "";
                  pika.findLogistics = "黑貓宅配";
                  pika.findSigningDate = "";
                  pika.findContractEndDate = "";
                  pika.findBoss = "";
                  pika.findContactPerson = "";
                  pika.findPhoneNumber = "";
                  pika.findEmail = "";
                  pika.findRemarks = "";
                  pika.signingDateMessage = "";
                  pika.contractEndDateMessage = "";
                }
              },
            });
          })
          .catch(function () {})
          .finally(function () {});
      }
    },

    //查詢全部的會員有哪些，for會員代號的填寫欄位
    callFindAllMembers: function () {
      let pika = this;
      axios
        .post(contextPath + "/members/findMembersByIdForAddS")
        .then(function (response) {
          pika.membersData = response.data;
        })
        .catch(function () {})
        .finally(function () {});
    },
  },
  mounted: function () {
    this.callFindAllMembers();
  },
});

app.mount("#app");
