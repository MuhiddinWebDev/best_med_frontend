<!-- <template>
  <b-container fluid class="all-div-height">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">Созламалар</h4>
      </md-card-header>
      <md-card-content>
       
        <b-row>
          <b-col>
            <b-button
              :to="{ path: '/settings/create' }"
              style="color: #ffffff;"
              variant="success"
              v-b-tooltip.hover.v-success.topright
              title="Филиал қўшиш"
            >
              <b-icon icon="plus" font-scale="1.3"></b-icon>
            </b-button>
            &nbsp;
            <b-button
              size="md"
              @click="Data()"
              v-b-tooltip.hover.v-primary
              variant="primary"
              title="Янгилаш"
            >
              <b-icon icon="arrow-clockwise"></b-icon>
            </b-button>
          </b-col>
          <b-col>
            <b-form-group
              label-for="filter-input"
              label-cols-sm="0"
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
                    @click="filter = ''"
                    variant="danger"
                    >Тозалаш</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
       
        <div class="table-height mt-2">
          <div class="d-flex justify-content-center mb-3" v-if="checkTable">
            <b-spinner
              variant="info"
              style="width: 3rem; height: 3rem;"
              type="grow"
              label="Spinning"
            ></b-spinner>
          </div>
          
          <b-table
            sticky-header="500px"
            striped
            hover
            :items="branches"
            :fields="fields"
            :filter="filter"
            :current-page="currentPage"
            :per-page="perPage"
            small
            bordered
            @row-clicked="UpdateBranch"
            style="cursor:pointer"
            class="align-middle"
          >
            <template #cell(index)="row">
              {{ row.index + 1 }}
            </template>
            <template #cell(name)="row">
              {{ row.value }}
            </template>
            <template #cell(logo)="row">
              <b-img 
                :src="row.value"
                rounded 
                center                
                class="logo-img1"
                ></b-img>
            </template>
            <template #cell(actions)="row">
              <b-button-group>
                <b-button
                  variant="outline-primary"
                  size="sm"
                  :to="{ path: '/settings/update/' + row.item.id }"
                  v-b-tooltip.hover.left.v-primary
                  style="color: #1E90FF"
                  title="Таҳрирлаш"
                >
                  <b-icon icon="Pencil" font-scale="0.9"></b-icon>
                </b-button>

                <b-button
                  size="sm"
                  @click="Delete(row.item.id)"
                  variant="outline-danger"
                  v-b-tooltip.hover.right.v-danger
                  title="Ўчириш"
                >
                  <b-icon icon="trash" font-scale="0.9"></b-icon>
                </b-button>
              </b-button-group>
            </template>
          </b-table>
        </div>

        <b-col sm="5" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
     
      </md-card-content>
    </md-card>
  </b-container>
</template> -->

<!-- <script>
const axios = require("axios");
const moment = require('moment')
export default {
  name: "settings-index",
  data: () => ({
    branches: [],
    filter: null,
    totalRows: 1,
    currentPage: 1,
    checkTable: false,
    perPage: 20,
    fields: [
      {
        key: "index",
        label: "#",
        sortable: false
      },
      {
        key: "name",
        label: "Филиал",
        sortable: true
      },
      {
        key: "logo",
        label: "Logo",
      },
      {
        key: "date1",
        label: "Date1",
        sortable: true,
        formatter: (value, key, item) => {
            return moment.unix(value).format("DD.MM.YYYY HH:mm");
        }
      },
      {
        key: "date2",
        label: "Date2",
        sortable: true,
        formatter: (value, key, item) => {
            return moment.unix(value).format("DD.MM.YYYY HH:mm");
        }
      },
      {
        key: "quote",
        label: "Quote",
      },
      {
        key: "actions",
        label: ""
      }
    ]
  }),
  async mounted() {
    await this.Data();
  },
  methods: {
    async Data() {
      let self = this;
      self.checkTable = true;
      //get list of settings => settings ro'yxatini olish
      try {
        const response = await self.axios.get("api/settings");
        self.branches = response.data;
        self.totalRows = self.branches.length;
        self.checkTable = false;
      } catch (error) {
        self.$store.state.errors = error;
      }
    },
    Delete(id) {
      this.$bvModal
        .msgBoxConfirm("Ҳақиқатан ҳам ўчиришни хоҳлайсизми?", {
          title: "Илтимос тасдиқланг!",
          size: "md",
          buttonSize: "md",
          okVariant: "outline-danger",
          okTitle: "Ҳа",
          cancelTitle: "Йўқ",
          cancelVariant: "info",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: false
        })
        .then(value => {
          let response = value;
          let self = this;
          if (response === true) {
            axios({
              method: "delete",
              url: "api/settings/id/" + id
            }).then(function(response) {
              self.Data();
            });
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    UpdateBranch(item) {
      let self = this;
      self.$router.push({ path: "/settings/update/" + item.id });
    }
  }
};
</script> -->

<!-- <style lang="scss" scoped>
.md-field {
  max-width: 300px;
}

.logo-img1 {
  max-width: 100px;
  max-height: 100px;
  display: inline-block;
  vertical-align: middle;
}

.align-middle {
  display: flex; 
  align-items: center;
}

.align-middle .table {
  display: flex;
  flex-direction: column; 
}

.align-middle .table td,
.align-middle .table th {
  display: flex;
  align-items: center;
}
</style> -->

<template>
  <div class="content">
    <md-card>
      <md-card-content>
        <b-container fluid>
          <b-row class="qidiruv">
            <b-col class="mb-2">
              <b-button
                class="qoshishBtn"
                variant="primary"
                @click="createRoomLink"
              >
                <span>
                  <b-icon icon="plus-circle-fill" color="#fff"></b-icon>
                  Қўшиш
                </span>
              </b-button>
            </b-col>

            <b-col lg="7">
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
                    @input=""
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
              class="tableStyle"
              id="room-table"
              ref="refUserTable"
              hover
              striped
              primary-key="id"
              :items="items"
              :fields="fields"
              :filter="filter"
              :per-page="perPage"
              :current-page="currentPage"
              :filter-included-fields="filterOn"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @row-clicked="RowClicked"
              sort-icon-left
              stacked="md"
              show-empty
              small
              @filtered="onFiltered"
            >
              <template #cell(#)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(name)="row">
                {{ row.value }}
              </template>
              <template #cell(logo)="row">
                <b-img
                  :src="row.value"
                  rounded
                  center
                  class="logo-img1"
                ></b-img>
              </template>
              <template #cell(actions)="row" class="lg-1">
                <b-row class="ml-1">
                  <section
                    style="display: flex; justify-content: flex-end; width: 100%; margin-right: 30px"
                  >
                    <div style="display: flex; margin-right: 15px">
                      <b-button
                        variant="outline-primary"
                        @click="updates(row.item.id)"
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
                    <div
                      v-if="
                        localUser.role == 'Admin' ||
                          localUser.role == 'Dasturlash'
                      "
                    >
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
      items: [],
      localUser: JSON.parse(localStorage.getItem("user")),
      fields: [
        {
          key: "index",
          label: "#",
          sortable: false,
        },
        {
          key: "name",
          label: "Филиал",
          sortable: true,
        },
        {
          key: "logo",
          label: "Logo",
        },
        {
          key: "date1",
          label: "Date1",
          sortable: true,
          formatter: (value, key, item) => {
            return moment.unix(value).format("DD.MM.YYYY");
          },
        },
        {
          key: "date2",
          label: "Date2",
          sortable: true,
          formatter: (value, key, item) => {
            return moment.unix(value).format("DD.MM.YYYY");
          },
        },
        {
          key: "quote",
          label: "Quote",
        },
        {
          key: "actions",
          label: "",
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: ["name"],
    };
  },
  mounted() {
    this.data();
  },
  methods: {
    RowClicked(item) {
      this.$router.push({ path: "/settings/update/" + item.id });
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
          s.totalRows = s.items.length;
          console.log(res.data.data);
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
};
</script>

<style scoped>
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
