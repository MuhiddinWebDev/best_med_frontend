<template>
  <div class="content ml-3">
    <md-card class="content1">
      <md-card-content>
        <b-container fluid>
          <b-row class="qidiruv">
            <b-col class="mb-2">
              <b-button
                class="qoshishBtn"
                variant="success"
                @click="RowClicked"
              >
                <span>
                  <b-icon icon="pencil-fill" color="#fff"></b-icon>
                  Тахрирлаш
                </span>
              </b-button>
            </b-col>
          </b-row>
          <div class="body" style="display: flex; column-gap: 1rem;">
            <div style="width: 40%;">
              <h5>Nomi: {{ items.name }}</h5>
              <img
                style="display: inline-block; width: 200px; height: 200px;"
                :src="items.logo"
                alt="Logotip"
              />
              <h5>Dastur boshlanish vaqti: {{ items.date1 | moment }}</h5>
              <h5>Dastur amal qilish vaqti: {{ items.date2 | moment }}</h5>
            </div>
            <div style="width: 58%;">
              <h5>Chek yozuvi: {{ items.quote }}</h5>
              <h5>1-Sarlavha: {{ items.header_left }}</h5>
              <h5>1-Sarlavha: {{ items.header_right }}</h5>
            </div>
          </div>
        </b-container>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "UserIndex",
  components: {},
  data() {
    return {
      items: {},
      localUser: JSON.parse(localStorage.getItem("user")),
    };
  },
  mounted() {
    this.data();
  },
  methods: {
    RowClicked(item) {
      this.$router.push({ path: "/settings/update"});
    },
    createRoomLink() {
      return this.$router.push({ path: "settings/create" });
    },
    data() {
      let s = this;
      axios({
        method: "get",
        url: "/settings",
      }).then((res) => {
        if (res != undefined) {
          s.items = res.data.data;
        }
      });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    trash(id) {
      const trash = window.confirm("Ma'lumotlar o'chirilsinmi?");
      if (trash) {
        let self = this;
        axios({
          method: "delete",
          url: "/settings/id/" + id,
        }).then((res) => {
          if (res.status == 200) {
            self.data();
          }
        });
      }
    },
    updates(id) {
      this.$router.push({ path: "/settings/update/" + id });
    },
  },
  filters: {
    moment: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY HH:mm");
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.qidiruv {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.tables {
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;
}
.content {
  margin-top: -60px;
}

.body {
  padding-left: 2rem;
  padding-right: 2rem;
}

.content1 {
  transition: 0.3 all ease-in;
}

.content1:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.qoshishBtn {
  display: flex;
  border-radius: 8px;
}

.pencil {
  width: 35px;
  height: 35px;
  display: flex;
  /* background: #fff; */
  /* border: 1px solid #000; */
  justify-content: center;
  border-radius: 50%;
  align-items: center;
}

.trash {
  /* background: #fff; */
  width: 35px;
  height: 35px;
  display: flex;
  /* border: 1px solid #000; */
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.logo-img1 {
  max-width: 100px;
  max-height: 100px;
  display: inline-block;
  vertical-align: middle;
}
</style>
