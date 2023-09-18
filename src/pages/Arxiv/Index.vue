<template>
  <div class="content">
    <md-card>
      <md-card-content>
        <b-container fluid>
          <div v-if="$route.name == 'Registration Archive'" class="katta-arxiv">
            <span>Бемор</span>
            <button
              style="padding: 4px 10px; margin-right: 10px"
              class="btn"
              @click="Prev()"
            >
              <b-icon style="color: white" icon="house-door-fill"> </b-icon>
            </button>
          </div>
          <b-row class="qidiruv">
            <b-col class="mb-2" style="display: flex;">
              <!-- <b-button
                style="margin-right: 20px;"
                class="qoshishBtn"
                variant="success"
                @click="createRoomLink"
              >
                <span>
                  <b-icon icon="plus-circle-fill" color="#fff"></b-icon>
                  Қўшиш
                </span>
              </b-button> -->
              <b-button class="qoshishBtn" variant="success" @click="data">
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
          <!-- User Interface controls -->
          <b-row class="qidiruv">
            <b-col class="mb-2"> </b-col>

            <!-- <b-col lg="7 mb-2">
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
            </b-col> -->
          </b-row>

          <div class="tables">
          
            <b-table
              ref="refUserTable"
              hover
              sticky-header
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
            >
              <template #cell(№)="data" style="text-align: center;">
                {{ data.index + 1 }}
              </template>
              <template #cell(Келган вақти)="data">
                {{ created_at | moment }}
              </template>
              <template #cell(actions)="row" class="lg-1">
                <b-row class="ml-1">
                  <section
                    style="display: flex; justify-content: flex-end; width: 100%; margin-right: 30px"
                  >
                    <div style="display: flex; margin-right: 15px">
                      <b-button
                        variant="outline-primary"
                        @click="xonalarLink(row.item.id)"
                        class="pencil"
                      >
                        <b-icon
                          style="width: 15px;"
                          variant="outline-primary"
                          icon="pencil-fill"
                          aria-hidden="true"
                        ></b-icon>
                      </b-button>
                    </div>
                    <!-- <div>
                      <b-button
                        class="trash"
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
                    </div> -->
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
      id: localStorage.getItem("ArxivId"),
      items: [],
      fields: [
        "№",
        { 
          key: "created_at",
          label: "Келган вақти",
       
        },
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
  mounted() {
    this.data();
  },
  filters: {
    moment: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY");
      } else {
        return "";
      }
    }
  },
  methods: {
    RowClicked(item) {
      const rout = this.$router.resolve({
        path: "/arxivone/" + item.id
      });
      window.open(rout.href, "_blank");
    },
    xonalarLink(id) {
      const rout = this.$router.resolve({
        path: "/arxivone/" + id
      });
      window.open(rout.href, "_blank");
    },
    Data() {
      let s = this;
      axios({
        method: "post",
        url: "/registration_arxiv/search_arxiv",
        data: {
          name: s.filter
        }
      }).then(res => {
        if (res != undefined) {
          s.getAll(res);
          // s.items = res.data.data;
          // s.totalRows = s.items.length;
        }
      });
    },
    data() {
      let s = this;
      if (this.id) {
        axios({
          method: "post",
          url: "/registration_arxiv/register",
          data: {
            patient_id: s.id
          }
        }).then(res => {
          if (res) {
            // this.getAll(res);
            s.items = res.data.data;
            s.totalRows = s.items.length;
          }
        });
      } else {
        axios({
          method: "get",
          url: "/registration_arxiv/all"
        }).then(res => {
          if (res) {
            this.getAll(res);
          }
        });
      }
    },
    getAll(res) {
      let s = this;
      let qidiruv = [];
      for (let key of res.data.data) {
        key.created_at = moment(new Date(key.created_at * 1000)).format(
          "DD.MM.YYYY HH:mm"
        );
        qidiruv.push(key);
        s.items = qidiruv;
      }
    },
    Prev() {
      this.id = null;
      localStorage.removeItem("ArxivId");
      window.close();
      // this.$router.push('/user')
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
    // trash(id) {
    //   const trash = window.confirm("Ma'lumotlar o'chirilsinmi?");
    //   if (trash) {
    //     let self = this;
    //     axios({
    //       method: "delete",
    //       url: "/room/delete/" + id
    //     }).then(() => {
    //       self.data();
    //     });
    //   }
    // }
  }
};
</script>
<style>
.tables {
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;
}
.navbarBtnDanger-arxiv {
  float: right;
}
.katta-arxiv {
  background: #379056;
  margin: -10px 15px 10px 15px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
  border-radius: 8px;
  color: #fff;
  text-indent: 15px;
  box-shadow: 5px 8px 10px rgba(100, 100, 111, 0.2) ;
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
.qoshishBtn {
  display: flex;
  border-radius: 8px;
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
</style>
