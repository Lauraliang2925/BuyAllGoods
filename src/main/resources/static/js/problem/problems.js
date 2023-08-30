const app = Vue.createApp({
  components: {
    paginate: VuejsPaginateNext,
  },
  data: function () {
    return {
      title: "",
      question: "",
      reply: "",
      memberId: "",
      questionId: "",
      createdDate: "",
      replyDate: "",

      userName: "",

      allQData: [],

      isShowReply: true,
      isShowReply1: false,
      isShowMessage: false,
      isShowQuestion: false,
      isShowGoMessageBtn: true,
      // isShowQuestionBtn: false,
      isShowReplyTextarea: false,
      isShowNotReply: true,
      isShowReply2: [],
      isShowAlready: true,

      isShowChangeBtn: true,

      userName: "",

      // 分頁功能所需參數
      start: 0, //起始資料index (from 0)
      rows: 2, //每頁顯示資料數量
      pages: 0, //總分頁數量
      current: 1, //目前頁面 (from 1)
      lastPageRows: 0, //最後一頁資料數量
    };
  },

  methods: {
    sendEmailRequest: function () {
      // 发送 POST 请求到后端
      axios
        .post(contextPath + "/EmailTest")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("发送邮件时出现错误：", error);
        });
    },
    //從留言板跟問答，切回顯示常見問題
    controlShowAlready: function () {
      this.isShowMessage = false;
      this.isShowQuestion = false;
      this.isShowAlready = !this.isShowAlready;
      document.getElementById("app").addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // 添加平滑滚动效果
        });
      });
    },
    //從寫死的常見問題，切換到顯示問答QA
    controlShowQuestionFromAlready: function () {
      this.isShowQuestion = !this.isShowQuestion;
      this.isShowAlready = !this.isShowAlready;
      document.getElementById("app").addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // 添加平滑滚动效果
        });
      });
    },
    //從寫死的常見問題，切換到顯示留言板
    controlShowMessageFromAlready: function () {
      this.isShowMessage = !this.isShowMessage;
      this.isShowAlready = !this.isShowAlready;
      document.getElementById("app").addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // 添加平滑滚动效果
        });
      });
    },

    //如果啥身分都沒有或是廠商，就只能查看問題，不能留言
    controlShowBtn: function () {
      let roleID = localStorage.getItem("RoleId");
      if (roleID === "2" || roleID == null) {
        this.isShowGoMessageBtn = false;
      }
    },

    //切換顯示回覆方框
    controlShowReply: function (index) {
      this.isShowReplyTextarea = !this.isShowReplyTextarea;
      this.isShowNotReply = !this.isShowNotReply;

      this.isShowReply2[index] = !this.isShowReply2[index];
    },

    //切換顯示留言板
    controlShowMessage: function () {
      this.isShowMessage = !this.isShowMessage;
      this.isShowQuestion = !this.isShowQuestion;
      this.isShowMessageBtn = !this.isShowMessageBtn;
      this.isShowQuestionBtn = !this.isShowQuestionBtn;
      this.isShowAlready = false;
      document.getElementById("app").addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // 添加平滑滚动效果
        });
      });
    },

    //找全部的留言
    callFindAllQ: function (page) {
      // 在點選分頁(page from 1)時，呼叫出顯示的資料
      if (page) {
        // 當點選指定分頁時的動作
        this.start = (page - 1) * this.rows;
        this.current = page;
      } else {
        // 未點選指定分頁時的動作(預設為第一頁)
        this.start = 0;
        this.current = 1;
      }

      let request = {
        current: this.current,
        rows: this.rows,
      };

      let vm = this;
      axios
        .get(contextPath + "/problem/findAllQ2", {
          params: request, // 将请求参数作为 params 对象
        })
        .then(function (response) {
          vm.allQData = response.data.list;
          let count = response.data.count;

          vm.pages = Math.ceil(count / vm.rows);
          vm.lastPageRows = count % vm.rows;

          let userRoleId = localStorage.getItem("RoleId");
          if (userRoleId === "1") {
            vm.isShowReply = false;
            vm.isShowReply1 = true;
          } else {
            vm.isShowReply = true;
            vm.isShowReply1 = false;
          }
        })
        .catch(function () {})
        .finally(function () {});
    },

    //進來先抓UserName
    getLocalUserName: function () {
      this.userName = localStorage.getItem("UserName");
    },

    //新增留言
    callInsertOne: function () {
      let request = {
        userName: this.userName,
        title: this.title,
        question: this.question,
      };
      console.log("request", request);

      axios
        .post(contextPath + "/problem/insertOne", request)
        .then(function (response) {
          bootbox.alert({
            title: "提醒！",
            message: '<div class="text-center">' + response.data + "</div>",
            buttons: {
              ok: {
                label: "關閉",
                className: "btn btn-warning",
              },
            },
            callback: function () {
              window.location.href = "/buyallgoods/goProblems";
            },
          });
        })
        .catch(function () {})
        .finally(function () {});
    },

    //回覆留言
    callReplyOne: function (questionId) {
      let request = {
        questionId: questionId,
      };
      let pipi = this;
      axios
        .post(contextPath + "/problem/findOne", request)
        .then(function (response) {
          console.log("response", response);

          if (pipi.reply == "") {
            bootbox.alert({
              title: "提醒！",
              message:
                '<div class="text-center">' +
                "回覆內容空白，請再次確認內容!!" +
                "</div>",
              buttons: {
                ok: {
                  label: "關閉",
                  className: "btn btn-warning",
                },
              },
            });
          } else {
            let request2 = {
              title: response.data.title,
              question: response.data.question,
              reply: pipi.reply,
              memberId: response.data.memberId,
              questionId: response.data.questionId,
              createdDate: response.data.createdDate,
            };
            console.log("request", request2);
            axios
              .post(contextPath + "/problem/replyOne", request2)
              .then(function (response2) {
                console.log("response", response2);

                bootbox.alert({
                  title: "提醒！",
                  message:
                    '<div class="text-center">' + response2.data + "</div>",
                  buttons: {
                    ok: {
                      label: "關閉",
                      className: "btn btn-warning",
                    },
                  },
                  callback: function () {
                    window.location.href = "/buyallgoods/goProblems";
                  },
                });
              })
              .catch(function () {})
              .finally(function () {});
          }
        })
        .catch(function () {})
        .finally(function () {});
    },
  },
  mounted: function () {
    this.callFindAllQ();
    this.getLocalUserName();
    this.controlShowBtn();
  },
});
app.mount("#app");
