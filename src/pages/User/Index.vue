<template>
  <div class="content">
    <md-card>
      <md-card-content>
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row class="qidiruv">
            <b-col class="mb-2" style="display: flex;">
              <b-button
                v-if="localUser.role != 'Loborant'"
                style="margin-right: 20px;"
                class="qoshishBtn"
                variant="success"
                @click="createRoomLink"
              >
                <span>
                  <b-icon icon="plus-circle-fill" color="#fff"></b-icon>
                  Қўшиш
                </span>
              </b-button>
              <b-button class="qoshishBtn" variant="success" @click="getUser">
                <span>
                  <b-icon icon="arrow-counterclockwise" color="#fff"></b-icon>
                  Янгилаш
                </span>
              </b-button>
            </b-col>

            <b-col lg="7" class="mb-1">
              <b-form-group
                label-for="filter-input"
                label-cols-sm="1"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    @input="Data()"
                    placeholder="Қидирув"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button
                      :disabled="!filter"
                      variant="danger"
                      @click="filter = ''"
                      >Тозалаш</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="tables">
            <b-table
              ref="refUserTable"
              hover
              sticky-header
              :tbody-tr-class="rowClass"
              striped
              primary-key="id"
              :items="items"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @row-clicked="RowClicked"
              sort-icon-left
              stacked="md"
              show-empty
              small
              variant="success"
            >
              <template #cell(№)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(actions)="row" class="lg-1">
                <b-row class="ml-1">
                  <section
                    style="display: flex; justify-content: flex-end; width: 100%; margin-right: 30px"
                  >
                    <div style="display: flex;">
                      <b-button
                        variant="outline-primary"
                        @click="userLink(row.item.id)"
                        class="pencil"
                      >
                        <b-icon
                          style="width: 15px;"
                          variant="outline-primary"
                          icon="pencil-fill"
                          aria-hidden="true"
                        ></b-icon>
                      </b-button>
                      <div
                        v-if="
                          localUser.role == 'Admin' ||
                          localUser.role == 'Dasturchi'
                        "
                      >
                        <b-button
                          class="trash ml-2"
                          style=""
                          variant="outline-danger"
                          @click="trash(row.item.id)"
                        >
                          <b-icon
                            style="width: 15px;"
                            icon="trash-fill"
                            aria-hidden="true"
                          ></b-icon>
                        </b-button>
                      </div>
                    </div>
                  </section>
                </b-row>
              </template>
            </b-table>
          </div>
          <b-row>
            <b-col sm="6" offset-sm="3" md="6" offset-md="3" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>
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
      localUser: JSON.parse(localStorage.getItem("user")),
      items: [],
      fields: [
        "№",
        { key: "created_at", label: "Келган вақти", sortable: true },
        { key: "patient.fullname", label: "Бемор", sortable: true },
        { key: "user.user_name", label: "Ходим", sortable: true },
        { 
          key: "type_service",
          label: "Хизмат тури",
          sortable: true,
          formatter: (value, key, item) => {
            return value == "Statsionar" ? "Стационар" : "Амбулатор";
          }
        },
        { key: "actions", label: "" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: ""
    };
  },
  created() {
    // this.getUser();
    // this.Data();
  },
  mounted() {
    this.getUser();
  },
  methods: {
    RowClicked(item) {
      this.$router.push({ path: "/user-update/" + item.id });
    },
    userLink(id) {
      return this.$router.push({ path: "user-update/" + id });
    },
    createRoomLink() {
      return this.$router.push({ path: "user-create" });
    },
    getUser() {
      let self = this;
      axios({
        method: "get",
        url: "/registration/all"
      }).then(res => {
        if (res != undefined) {
          self.getAll(res);
        }
      });
    },
    Data() {
      let s = this;
      axios({
        method: "post",
        url: "/registration/searchs",
        data: {
          name: s.filter
        }
      }).then(res => {
        if (res != undefined) {
          s.getAll(res);
        }
      });
    },
    getAll(res) {
      let s = this;
      let qidiruv = [];
      for (let key of res.data.data) {
        key.created_at = moment(new Date(key.created_at * 1000)).format(
          "DD.MM.YYYY HH:mm"
        );
        if (s.localUser.role == "Shifokor") {
          for (let index = 0; index < key.registration_doctor.length; index++) {
            const element = key.registration_doctor[index];
            if (
              element.doctor_id == s.localUser.doctor_id &&
              Number(key.backlog) == 0
            ) {
              qidiruv.push(key);
              s.totalRows = qidiruv.length;
            }
          }
          s.items = qidiruv;
        }else if (s.localUser.role == "Loborant") {
          let count = 0;
          key.registration_inspection.forEach(val => {
            if(val.user_id == s.localUser.id){
              count ++
              if((key.type_service == 'Statsionar' && count < 2) || (key.backlog == 0 && count < 2)){
                qidiruv.push(key);
                s.totalRows = qidiruv.length;
              }
              s.items = qidiruv;
            }
          });
        } else if (s.localUser.role == "Kasser") {
          qidiruv.push(key);
          s.items = qidiruv;
        } else if (
          s.localUser.role == "Admin" ||
          s.localUser.role == "Dasturchi" ||
          s.localUser.role == "Registrator"
        ) {
          qidiruv.push(key);
          s.items = qidiruv;
        }
      }
    },
    rowClass(item, type) {
      if (!item || !item.patient || type !== "row") return;
      if (item.patient.imtiyoz_type != "Imtiyozsiz") {
        return "table-warning";
      } else {
        if (item.backlog == 0) {
          return "table-success";
        } else {
          return "table-danger";
        }
      }
    },
    // Qidiruv(filter) {
    //   let self = this;
    //   // if(filter.length > 2){
    //   axios({
    //     method: "post",
    //     url: "/registration/searchs",
    //     data: {
    //       name: filter
    //     }
    //   }).then(res => {
    //     self.items = res.data.data;
    //   });
    //   // } else{
    //   //   return self.items
    //   // }
    // }
    trash(id) {
      const trash = window.confirm("Ma'lumotlar o'chirilsinmi?");
      if (trash) {
        let self = this;
        axios({
          method: "delete",
          url: "/registration/delete/" + id
        }).then(() => {
          self.Data();
        });
      }
    }
  }
};
</script>
<style>
.qidiruv {
  display: flex;
  justify-content: space-between;
}
.tables {
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;
}
.content {
  margin-top: -60px;
}
.qoshishBtn {
  display: flex;
  border-radius: 8px;
}
.pencil {
  width: 35px;
  height: 35px;
  display: flex;
  background: #fff;
  border: 1px solid #e9f1fa;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
}
.trash {
  background: #fff;
  width: 35px;
  height: 35px;
  display: flex;
  border: 1px solid #fff0f0;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.rowgroup {
  background: #379056 !important;
} 
</style>
