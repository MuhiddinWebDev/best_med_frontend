<template>
  <div class="content ml-3">
    <md-card>
      <md-card-content>
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row class="qidiruv">
            <b-col class="mb-2">
              <b-button
                class="qoshishBtn"
                variant="success"
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
              <template #cell(№)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(actions)="row">
                <b-row class="ml-1">
                  <section
                    style="display: flex; justify-content: flex-end; width: 100%; margin-right: 30px"
                  >
                    <div style="display: flex; margin-right: 15px">
                      <b-button
                        variant="outline-primary"
                        @click="shifokorLink(row.item.id)"
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
                    <div>
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
export default {
  name: "UserIndex",
  components: {},
  data() {
    return {
      items: [],
      fields: [
        "№",
        { key: "name", label: "Шифокор", sortable: true },
        {
          key: "doctor_category.name",
          label: "Шифокор бўлими",
          sortable: true
        },
        { key: "filial.name", label: "Филиал ", sortable: true },
        { key: "actions", label: "" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: ["name"]
    };
  },
  mounted() {
    this.data();
  },
  methods: {
    RowClicked(item) {
      this.$router.push({ path: "/shifokor-update/" + item.id });
    },
    shifokorLink(id) {
      return this.$router.push({ path: "shifokor-update/" + id });
    },
    createRoomLink() {
      return this.$router.push({ path: "shifokor-create" });
    },
    data() {
      let s = this;
      axios({
        method: "get",
        url: "/doctor/all"
      }).then(res => {
        if (res != undefined) {
          s.items = res.data;
          s.totalRows = s.items.length;
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
          url: "/doctor/delete/" + id
        }).then(res => {
          if (res != undefined) {
            self.data();
          }
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
.content {
  margin-top: -60px;
}
.qoshishBtn {
  display: flex;
  border-radius: 8px;
}
.input-group:not(.has-validation) > .form-control:not(:last-child) {
  height: 40px;
  border: 1px solid #e9f1fa;
  /* background: #9dd0ff3e; */
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.input-group > .input-group-append > .btn {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.tables {
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;
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
</style>
