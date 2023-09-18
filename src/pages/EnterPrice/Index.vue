<template>
  <div class="content ml-3">
    <md-card>
      <md-card-content>
        <b-container fluid>
          <!-- User Interface controls -->
          <div class="tables">
            <h4 class="padding-lg">Кириш нархи</h4>
            <b-table
              id="room-table"
              ref="refUserTable"
              hover
              sticky-header
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
                        @click="shifokorBolimiLink(row.item.id)"
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
        { 
          key: "odam_price", 
          label: " Одам кириш нархи", 
          sortable: true,
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat("ru-RU", {
              minimumFractionDigits: 2,
            });
            return formatter.format(value);
          },
        },
        {
          key: "moshina_price",
          label: "Машина кириш нархи ",
          sortable: true,
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat("ru-RU", {
              minimumFractionDigits: 2,
            });
            return formatter.format(value);
          },
        },
        { key: "actions", label: "" },
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
      this.$router.push({ path: "/enter-price-update/" + item.id });
    },
    shifokorBolimiLink(id) {
      return this.$router.push({ path: "/enter-price-update/" + id });
    },
    data() {
      let s = this;
      axios({
        method: "get",
        url: "/kirish_summa/all",
      }).then((res) => {
        if (res != undefined) {
          s.items = res.data.data;
          s.totalRows = s.items.length;
        }
      });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
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
.tables {
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;
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
</style>
