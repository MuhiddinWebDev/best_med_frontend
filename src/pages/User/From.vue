<template>
  <div class="parent">
    <div class="tugmalarNavbar1">
      <button
        class="navbarBtn"
        @click="Saqlash"
        :disabled="$route.name == 'ArxivOne'"
      >
        <b-spinner small v-if="sending"></b-spinner>
        Сақлаш ва беркитиш
      </button>

      <button class="navbarBtn" @click="ArxivPush">Касаллик тарихи</button>
      <button
        class="navbarBtn"
        :disabled="user.type_service !== 'Statsionar'"
        @click="Arxiv"
      >
        Архивга олиш
      </button>

      <div class="navbarBtnCheckbox" :disabled="$route.name == 'ArxivOne'">
        <b-form-checkbox
          :disabled="localUser.role != 'Shifokor'"
          id="checkbox-1"
          name="checkbox-1"
          value="complate"
          unchecked-value="waiting"
          v-model="user.status"
          @change="allowCheck"
        >
          <span style="color: #fff;">Тугатиш</span>
        </b-form-checkbox>
      </div>
      <!-- <button class="navbarBtn" @click="ChekTolovlar"  :disabled="$route.name == 'ArxivOne'">
        Chop etish
      </button> -->
      <input
        :disabled="$route.name == 'ArxivOne'"
        type="file"
        style="display: none"
        id="files"
        ref="files"
        @change="onUploadTashxis()"
        name="href"
        class="my-0"
      />
      <button
        class="navbarBtn"
        @click="$refs.files.click()"
        :disabled="$route.name == 'ArxivOne'"
      >
        Ташхисларни юклаш
      </button>
      <b-button class="navbarBtnDanger" variant="danger" @click="cancel()">
        <b-icon icon="x-circle-fill"></b-icon>
      </b-button>
    </div>
    <div class="inputlarUser" :class="{ Arxive: $route.name == 'ArxivOne' }">
      <b-row>
        <b-col class="col-4">
          <span class="spanlar"
            >Бемор
            <span style="color: red;">*</span>
          </span>
          <div style="display: flex;">
            <v-select
              :options="items"
              label="fullname"
              :value="selectedBemor"
              @input="selectChange"
              @search="myFilter"
              class="qidiruvselect selektBemor"
            >
              <template #selected-option-container="{ option }">
                <span style="position:absolute;">
                  <span>{{ option.fullname }}</span>
                </span>
              </template>
            </v-select>
            <b-input-group-append>
              <b-button
                style="border: 1px solid #fff; height: 35px;"
                size="sm"
                class="btn"
                text="Button"
                v-b-modal.modal-no-backdrop
                variant="primary"
                >...</b-button
              >
            </b-input-group-append>
          </div>
        </b-col>

        <div>
          <b-modal
            id="modal-no-backdrop"
            content-class="shadow"
            size="xl"
            title="Бемор қидириш"
            hide-footer
          >
          <div class="header-action" >
            <div class="datepicker">
              <date-picker
                style="width: 100%;"
                placeholder="Кун.Ой.Йил"
                format="DD.MM.YYYY"
                value-type="X"
                type="date"
                v-model="selectedDate"
                @input="selectedDateChange"
              ></date-picker>
            </div>
            <div class="mb-2 modalQidiruv">
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
                    @input="Qidiruv"
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
            </div>
          </div>
            <div>
              <!-- :filter="filter" -->
              <!-- :filter-included-fields="filterOn" -->
              <b-table
                id="bemor-table"
                ref="refBemorTable"
                hover
                sort-icon-left
                striped
                primary-key="id"
                :items="items"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @row-clicked="RowClicked"
                stacked="md"
                show-empty
                small
              >
                <template #cell(№)="data">
                  {{ data.index + 1 }}
                </template>
              </b-table>
            </div>
          </b-modal>
        </div>

        <b-col>
          <span class="spanlar">Оператор</span>
          <!-- <v-select
            class="qidiruvselect"
            label="name"
            :disabled="true"
            v-model="localUser.user_name"
          /> -->
          <b-input
            style="height: 35px; background-color: #fff; border-radius: 4px;"
            v-model="user_name"
            :disabled="true"
          >
          </b-input>
        </b-col>
        <b-col>
          <span class="spanlar">Воситачи</span>
          <v-select
            class="qidiruvselect"
            label="name"
            v-model="user.direct_id"
            :options="Naprovitel"
            :reduce="option => option.id"
          />
        </b-col>
        <b-col>
          <span class="spanlar">Хизмат тури</span>
          <v-select
            class="qidiruvselect"
            label="name"
            :components="{ Deselect }"
            v-model="user.type_service"
            :options="XizmatTuri"
          />
        </b-col>

        <b-col>
          <span class="spanlar">Умумий сумма</span>
          <vue-numeric
            style="width: 100%; height: 35px;"
            :disabled="true"
            separator="space"
            :precision="2"
            v-model="user.summa"
          ></vue-numeric>
        </b-col>
      </b-row>
      <b-row> </b-row>
    </div>
    <template>
      <div style="position: relative;">
        <div
          :class="{ Arxive: $route.name == 'ArxivOne' }"
          style="position: absolute; z-index: 1; right: 2%; top: -3px;  display: flex;"
        >
          <!-- <b-input type="text" v-model="user.tramma_type"></b-input> -->
          <div style="width: 200px;">
            <span>Имтиёз</span>
            <v-select
              style="width: 100%;"
              :disabled="
                $route.name == 'User Profile Create' && user.patient_id != null
              "
              :options="Imtiyoz"
              :components="{ Deselect }"
              label="name"
              v-model="bemor.imtiyoz_type"
            />
          </div>
          <!-- <div style="width: 200px;">
            <span>Бемор келган вақт</span>
            <div
              style="border: 1px solid #D2D2D2; height: 34px; border-radius: 3px; background: #fff;"
            >
              {{ user.tramma_type }}
            </div>
          </div> -->
        </div>
        <b-card no-body class="tablar">
          <b-tabs v-model="tabIndex" card>
            <b-tab
              class="bemorlarinput"
              title="Бемор"
              title-link-class="text-primary"
              :class="{ Arxive: $route.name == 'ArxivOne' }"
            >
              <div style="display: flex; justify-content: space-between;">
                <div style="width: 49.5%;">
                  <label>
                    Фамилия
                    <span style="color: red;">*</span>
                    <span v-if="errors != null">
                      <span
                        style="color: red; font-size: 9px"
                        v-if="!errors.lastname.required"
                        >Фамилия тўлдирилиши керак</span
                      >
                      <span
                        style="color: red; font-size: 9px"
                        v-if="!errors.lastname.minLength"
                        >Фамилияда камида 4 та белги бўлиши керак</span
                      >
                    </span>
                  </label>
                  <b-input
                    type="text"
                    style="background: #fff; border: 1px solid #ced4da;"
                    v-model="bemor.lastname"
                    placeholder="Фамилияни тўлдиринг"
                    @input="fullName"
                  ></b-input>

                  <label>
                    Исми
                    <span style="color: red;">*</span>
                    <span v-if="errors !== null">
                      <span
                        style="color: red; font-size: 9px"
                        v-if="!errors.name.required"
                        >Исми тўлдирилиши керак</span
                      >
                      <span
                        style="color: red; font-size: 9px"
                        v-if="!errors.name.minLength"
                        >Исмида камида 4 та белги бўлиши керак</span
                      >
                    </span>
                  </label>
                  <b-input
                    type="text"
                    style="background: #fff; border: 1px solid #ced4da;"
                    v-model="bemor.name"
                    placeholder="Исмини тўлдиринг"
                    @input="fullName"
                  >
                  </b-input>

                  <label>
                    Отасининг исми
                    <span v-if="errors !== null">
                      <span
                        style="color: red; font-size: 9px"
                        v-if="!errors.patronymic.minLength"
                        >Отасининг исмида камида 4 та белги бўлиши керак</span
                      >
                    </span>
                  </label>
                  <b-input
                    type="text"
                    style="background: #fff; border: 1px solid #ced4da;"
                    v-model="bemor.patronymic"
                    placeholder="Отасининг исмини тўлдиринг"
                    @input="fullName"
                  ></b-input>

                  <div
                    style="display: flex; justify-content: space-between; width: 100%;"
                  >
                    <div style="width: 100%;">
                      <label>
                        Туғилган сана
                        <span style="color: red;">*</span>
                        <span v-if="errors !== null">
                          <span
                            style="color: red; font-size: 9px"
                            v-if="!errors.birthday.required"
                            >Туғилган сана тўлдирилиши керак</span
                          >
                        </span>
                      </label>
                      <!-- <input  type="date" formtarget="dd/mm/yyyy" value="" @input="formatDatePicker"> -->
                      <date-picker
                        style="width: 100%;"
                        v-model="bemor.birthday"
                        placeholder="Кун.Ой.Йил"
                        format="DD.MM.YYYY"
                        value-type="X"
                        type="date"
                        :lang="lang"
                      ></date-picker>
                    </div>
                  </div>
                  <b-button
                    v-if="this.$route.name == 'User Profile Create'"
                    :disabled="user.patient_id != null"
                    class="mt-3 successBtn"
                    @click="createBemor()"
                    variant="success"
                    >Сақлаш</b-button
                  >
                  <b-button
                    v-if="this.$route.name == 'User Profile Update'"
                    class="mt-3 successBtn"
                    @click="updateBemor()"
                    variant="success"
                    >Сақлаш</b-button
                  >
                </div>

                <div class="bbbbbb" style="width: 49.5%;">
                  <div style="display: flex; justify-content: space-between;">
                    <div style="width: 100%;">
                      <label>Вилоят</label>
                      <v-select
                        style="background: #ffff; border-radius: 4px;"
                        :options="region"
                        label="name"
                        @input="PostRegion"
                        :reduce="option => option.id"
                        v-model="bemor.region_id"
                        placeholder="Вилоятни тўлдиринг"
                      />

                      <label class="mt-1">Туман</label>
                      <v-select
                        style="background: #ffff; border-radius: 4px;"
                        :options="district"
                        label="name"
                        :reduce="option => option.id"
                        v-model="bemor.district_id"
                        placeholder="Туманни тўлдиринг"
                      />
                      <label>Уй</label>
                      <b-input
                        type="text"
                        style="background: #fff; border: 1px solid #ced4da;"
                        v-model="bemor.addres"
                        placeholder="Уйни тўлдиринг"
                      ></b-input>
                    </div>
                  </div>
                  <b-row>
                    <b-col>
                      <b-form-group>
                        <label>
                          Жинси
                          <span style="color: red;">*</span>
                          <span v-if="errors !== null">
                            <span
                              style="color: red; font-size: 9px"
                              v-if="!errors.gender.required"
                              >Жинси танланиши керак</span
                            >
                          </span>
                        </label>
                        <b-row style="margin-top: -10px;">
                          <b-col>
                            <b-form-radio
                              name="some-radios"
                              v-model="bemor.gender"
                              value="Erkak"
                              >Еркак</b-form-radio
                            >
                          </b-col>

                          <b-col>
                            <b-form-radio
                              name="some-radios"
                              v-model="bemor.gender"
                              value="Ayol"
                              >Аёл</b-form-radio
                            >
                          </b-col>
                        </b-row>
                      </b-form-group>
                    </b-col>
                    <!-- <b-col>
                      <label>
                        <b-form-checkbox
                          :value="true"
                          :disabled="
                            $route.name == 'User Profile Create' &&
                              user.patient_id != null
                          "
                          :unchecked-value="false"
                          v-model="bemor.citizen"
                        >
                          <span>Фуқаролиги</span>
                        </b-form-checkbox>
                      </label>
                    </b-col> -->
                    <b-col class="col-5">
                      <label>
                        Тел рақами
                        <span style="color: red;">*</span>
                        <span v-if="errors !== null">
                          <span
                            style="color: red; font-size: 9px"
                            v-if="!errors.phone.required"
                            >Тел рақами тўлдирилиши керак</span
                          >
                          <span
                            style="color: red; font-size: 9px"
                            v-if="!errors.phone.minLength"
                            >Тел рақамида камида 9 та белги бўлиши керак</span
                          >
                        </span>
                      </label>
                      <b-input
                        type="number"
                        style="background: #fff; border: 1px solid #ced4da;"
                        v-model="bemor.phone"
                        placeholder="+998XXXXXX"
                      ></b-input>
                    </b-col>

                    <!-- <b-col>
                      <label>
                        Пасспорт рақами
                      </label>
                      <b-input
                        type="text"
                        style="background: #fff; border: 1px solid #ced4da;"
                        v-model="bemor.passport"
                        placeholder="AB1234567"
                      ></b-input>
                    </b-col> -->
                  </b-row>
                </div>
              </div>
            </b-tab>

            <b-tab
              v-if="localUser.role != 'Loborant'"
              title="Бемор шикояти"
              title-link-class="text-primary"
              style="padding: 10px !important;"
              :class="{ Arxive: $route.name == 'ArxivOne' }"
            >
              <div style="width: 100%;">
                <div
                  style="display: flex; margin-bottom: 10px; justify-content: space-between;"
                >
                  <!-- <label>Бемор шикояти</label> -->
                  <div>
                    <button class="navbarBtnTashxis" v-b-modal.modal-10>
                      <b-icon icon="collection"></b-icon>
                    </button>
                    <b-modal
                      id="modal-10"
                      size="lg"
                      title="Шикоятлар рўйхати"
                      hide-footer
                    >
                      <div>
                        <div
                          style="display: flex; justify-content: space-between;"
                        >
                          <button
                            class="navbarBtnTashxis mb-2"
                            v-b-modal.modal-8
                          >
                            <b-icon icon="plus-lg"></b-icon>
                          </button>
                          <b-form-group
                            label-for="filterTekshiruvlar-input"
                            label-cols-sm="1"
                            label-align-sm="right"
                            label-size="sm"
                            class="mb-2 col-8"
                          >
                            <b-input-group size="sm">
                              <b-form-input
                                id="filterTekshiruvlar-input"
                                v-model="filterShikoyat"
                                type="search"
                                placeholder="Қидирув"
                              ></b-form-input>

                              <b-input-group-append>
                                <b-button
                                  :disabled="!filterShikoyat"
                                  variant="danger"
                                  @click="filterShikoyat = ''"
                                >
                                  Тозалаш</b-button
                                >
                              </b-input-group-append>
                            </b-input-group>
                          </b-form-group>
                        </div>
                        <div>
                          <div class="modalOverflow">
                            <b-table
                              id="bemor-table"
                              ref="refShikoyatTable"
                              hover
                              sort-icon-left
                              striped
                              primary-key="id"
                              :items="itemsShikoyat"
                              :fields="fieldsShikoyat"
                              :filter="filterShikoyat"
                              :per-page="perPageShikoyat"
                              :current-page="currentPageShikoyat"
                              :filter-included-fields="filterOnShikoyat"
                              :sort-by.sync="sortByShikoyat"
                              :sort-desc.sync="sortDescShikoyat"
                              :sort-direction="sortDirectionShikoyat"
                              @row-clicked="RowClickedShikoyat"
                              stacked="md"
                              show-empty
                              small
                            >
                              <template #cell(№)="data">
                                {{ data.index + 1 }}
                              </template>
                            </b-table>
                          </div>
                        </div>
                      </div>
                    </b-modal>
                  </div>
                </div>
                <div class="overflow-shkoyat">
                  <ckeditor
                    :editor="editor"
                    :config="editorConfig"
                    v-model="user.complaint"
                    
                  >
                  </ckeditor>
                  <!-- <textarea 
                    style="width: 100%;padding: 12px 20px;box-sizing: border-box;border: 2px solid #ccc;border-radius: 4px;background-color: #f8f8f8;font-size: 16px;" 
                    cols="25" rows="2"
                    v-model="user.complaint">
                  </textarea> -->
                </div>
              </div>
            </b-tab>

            <b-tab
              v-if="localUser.role != 'Loborant'"
              title="Шифокор"
              title-link-class="text-primary"
              style="padding: 10px !important;"
              :class="{ Arxive: $route.name == 'ArxivOne' }"
            >
              <div
                style="display: flex; justify-content: space-between; margin-top: -10px;"
              >
                <div>
                  <button
                    class="tabsBtns"
                    style="margin-top: 6px;"
                    v-b-modal.modal-1
                    @click="getShifokor()"
                  >
                    Шифокорлар
                  </button>
                  <div>
                    <b-modal
                      id="modal-1"
                      size="xl"
                      title="Шифокорлар рўйхати"
                      hide-footer
                    >
                    <div class="mb-2 modalQidiruv">
                          <b-form-group
                            label-for="filterShifokor-input"
                            label-cols-sm="1"
                            label-align-sm="right"
                            label-size="sm"
                            class="mb-0"
                          >
                            <b-input-group size="sm">
                              <b-form-input
                                id="filterShifokor-input"
                                v-model="filterShifokor"
                                type="search"
                                placeholder="Қидирув"
                              ></b-form-input>

                              <b-input-group-append>
                                <b-button
                                  :disabled="!filterShifokor"
                                  variant="danger"
                                  @click="filterShifokor = ''"
                                >
                                  Тозалаш</b-button
                                >
                              </b-input-group-append>
                            </b-input-group>
                          </b-form-group>
                        </div>
                    <b-card 
                    v-for="(item,index) in itemsShifokor"
                    >
                      <div style="display: flex;">
                        <button
                          class="navbarBtnTashxismkb mr-2"
                          style="background: #2828ff !important;"
                          v-b-toggle="'idx-' + index"
                        >
                          <b-icon
                            font-scale="1.5"
                            icon="arrow-bar-right"
                          ></b-icon>
                        </button>
                        <h5
                          v-b-toggle="'idx-' + index"
                          style="width: 100%; padding: 7px 0px;"
                        >
                          {{ item.name }}
                        </h5>
                      </div>
                        <div>     
                          <div>
                            <b-collapse :id="'idx-' + index" class="mt-2" :visible="item.id == localUser.filial.id">
                              <b-card style="z-index: 5;">
                                <div>
                                  <div class="modalOverflow">
                                    <b-table
                                      id="bemor-table"
                                      ref="refShifokorTable"
                                      hover
                                      sort-icon-left
                                      striped
                                      primary-key="id"
                                      :items="item.doctor"
                                      :fields="fieldsShifokor"
                                      :filter="filterShifokor"
                                      :per-page="perPageShifokor"
                                      :current-page="currentPageShifokor"
                                      :filter-included-fields="filterOnShifokor"
                                      :sort-by.sync="sortByShifokor"
                                      :sort-desc.sync="sortDescShifokor"
                                      :sort-direction="sortDirectionShifokor"
                                      @row-clicked="RowClickedShifokor"
                                      stacked="md"
                                      show-empty
                                      small
                                      @filtered="onFilteredShifokor"
                                    >
                                      <template #cell(№)="data">
                                        {{ data.index + 1 }}
                                      </template>
                                    </b-table>
                                  </div>
                                </div>
                              </b-card>
                            </b-collapse>
                          </div>
                        </div>
                    </b-card>
                    </b-modal>
                  </div>
                </div>
              </div>

              <b-row v-if="this.user.registration_doctor.length != 0">
                <b-col class="mt-2">
                  <table
                    style="background: #fff;"
                    class="table table-sm table-bordered"
                  >
                    <thead class="shifokorTable">
                      <tr>
                        <th style="width: 30px;">№</th>
                        <th>Ф.И.Ш</th>
                        <th>Бўлим</th>
                        <th>Сумма</th>
                        <th>Вақти</th>
                        <th>Филиал</th>
                        <th style="width: 40px;"></th>
                        <!-- <th><label>Xona raqami</label></th> -->
                      </tr>
                    </thead>

                    <tbody v-b-scrollspy="1">
                      <tr
                        v-for="(itemSh, index) in user.registration_doctor"
                        :key="index"
                        style="cursor: pointer"
                        :class="{ bg: index % 2 == 1 }"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ itemSh.doctor.name }}</td>
                        <td>{{ itemSh.doctor.doctor_category.name }}</td>
                        <td>{{ itemSh.price | numFormat }}</td>
                        <td>
                          <!-- <date-picker
                            style="width: 100%; pointer-events: none;"
                            v-model="itemSh.date_time"
                            format="DD.MM.YYYY HH:mm"
                            value-type="X"
                            type="datetime"
                            :lang="lang"
                          ></date-picker> -->
                          {{ itemSh.date_time | momentM }}
                        </td>
                        <td>{{ itemSh.filial ? itemSh.filial.name:'' }}</td>
                        <td>
                          <b-button
                            class="trash1"
                            @click="deleteShifokor(index)"
                            variant="outline-danger"
                          >
                            <b-icon style="width: 17px;" icon="trash"></b-icon>
                          </b-button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </b-col>
              </b-row>
            </b-tab>

            <b-tab
              title="Текширув"
              title-link-class="text-primary"
              style="padding: 10px !important;"
            >
              <div style="margin-top: -5px; margin-bottom: 7px;">
                <button
                  class="tabsBtns"
                  v-b-modal.modalPopover
                  variant="primary"
                  @click="getTekshiruvlar"
                  :class="{ Arxive: $route.name == 'ArxivOne' }"
                >
                  Текширувлар
                </button>
                <b-modal
                  id="modalPopover"
                  size="xl"
                  title="Текширувлар рўйхати"
                  hide-footer
                >
                <div style="padding: 6px 15px;">
                  <div class="table-header">
                      <div class="table-header_item">
                        <button
                        @click="TekshiruvBtn"
                        class="tabsBtns"
                        >
                        Танлаш
                        <b-spinner small v-if="spinTekshiruv"></b-spinner>
                        </button>
                      </div>
                  </div>
                </div>
                  <b-card
                    v-for="(item, index) in itemsTekshiruvlar"
                    :key="index"
                    style="padding: 5px 0px; margin: 3px 10px;"
                  >
                  
                    <div style="display: flex;">
                      <button
                        class="navbarBtnTashxismkb mr-2"
                        style="background: #2828ff !important;"
                        v-b-toggle="'ind-' + index"
                      >
                        <b-icon
                          font-scale="1.5"
                          icon="house-door"
                        ></b-icon>
                      </button>
                      <h5
                        v-b-toggle="'ind-' + index"
                        style="width: 100%; padding: 7px 0px;"
                      >
                        {{ item.name }}
                      </h5>
                    </div>

                    <b-collapse :id="'ind-' + index" :visible="openTekshiruv(item.type)" class="mt-2">
                      <div class="inspect-wrap" style="z-index: 4;" v-for="(child1, idx1) in item.type"  >
                        
                        <b-card v-for="(child2, idx2) in child1.inspection_category" >
                          <div style="display: flex;">
                              <button
                                class="navbarBtnTashxismkb mr-2"
                                style="background: #2828ff !important;"
                                v-b-toggle="'child-' + idx2 + index + '_idx'"
                              >
                                <b-icon
                                  font-scale="1.5"
                                  icon="arrow-bar-right"
                                ></b-icon>
                              </button>
                              <h5
                                v-b-toggle="'child-' + idx2 + index + '_idx'"
                                style="width: 100%; padding: 7px 0px;"
                              >
                              {{ child2.name }}
                              {{ child2.id }}
                              </h5>
                          </div>
                          <b-collapse :id="'child-' + idx2 + index + '_idx'" class="mt-2">
                            <div>
                              <div>
                                <div class="modalOverflow">
                                  <b-table
                                    id="bemor-table"
                                    ref="refTekshiruvTable"
                                    hover
                                    sort-icon-left
                                    striped
                                    primary-key="id"
                                    :items="child2.inspection"
                                    :fields="fieldsTekshiruvlar"
                                    :per-page="perPageTekshiruvlar"
                                    :current-page="currentPageTekshiruvlar"
                                    :filter-included-fields="filterOnTekshiruvlar"
                                    :sort-by.sync="sortByTekshiruvlar"
                                    :sort-desc.sync="sortDescTekshiruvlar"
                                    :sort-direction="sortDirectionTekshiruvlar"
                                    stacked="md"
                                    show-empty
                                    small
                                    @filtered="onFilteredTekshiruvlar"
                                  >
                                    <template #cell(№)="data">
                                      {{ data.index + 1 }}
                                    </template>
                                    <template #cell(Танлаш)="data">
                                      <b-form-checkbox
                                        @change="RowClickedTekshiruvlar(data.item)"
                                        v-model="data.checked"
                                        :disabled="chooseAllow(data.item.id)"
                                        :unchanged-value="false"
                                        :value="true"
                                        >
                                      </b-form-checkbox>
                                    </template>
                                  </b-table>
                                </div>
                              </div>
                            </div>
                          </b-collapse>
                        </b-card>

                      </div>

                    </b-collapse>
                  </b-card>
                </b-modal>
              </div>

              <div v-if="this.user.registration_inspection.length != 0">
                <div class="overflow">
                        <table class="table table-sm table-bordered">
                          <thead class="shifokorTable">
                            <tr>
                              <th style="width: 55px; text-align: center;">№</th>
                              <th>Номи</th>
                              <th>Нархи</th>
                              <th>Филиал</th>
                              <th style="width: 100px;">Амал</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item,
                              index1) in user.registration_inspection"
                              :key="index1"
                              :class="{ bg: index1 % 2 == 1 }"
                            >
                              <td style="width: 55px; text-align: center;">{{ index1 + 1 }}</td>
                              <td>{{item.inspection.name}}</td>
                              <td>{{ new Intl.NumberFormat('ru-Ru',{
                                style:'decimal',
                                minimumFractionDigits: 2
                              }).format(item.price) }} </td>
                              <td>{{ item.filial ?  item.filial.name: "" }}</td>
                              <td style="width: 100px;">
                                <div style="display: grid; place-items: center;">
                                  <b-button
                                    style="width: 50px; height: 40px; display: flex; align-items: center; justify-content: center; margin-top: 10px;"
                                    @click="deleteTekshiruv(index1)"
                                    variant="danger"
                                  >
                                  <b-icon
                                    style="width: 17px;"
                                    icon="trash"
                                  ></b-icon>
                                  </b-button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
              </div>
            </b-tab>
            <b-tab
              title="Палата"
              v-if="localUser.role != 'Loborant'"
              title-link-class="text-primary"
              :class="{ Arxive: $route.name == 'ArxivOne' }"
            >
              <div
                style="margin-top: -3px; width: 100%; display: flex; justify-content: space-between;"
              >
                <div style="width: 20%">
                  <div>Келган вақт</div>
                  <date-picker
                    style="width: 100%;"
                    v-model="palata.date_to"
                    format="DD.MM.YYYY"
                    value-type="X"
                    type="datetime"
                    :lang="lang"
                  ></date-picker>
                </div>
                <div style="width: 20%">
                  <div>Қолиш вақти</div>
                  <!-- <b-form-input
                    type="number"
                    v-model="vaqt"
                    @input="qoladiganKun"
                  ></b-form-input> -->
                  <vue-numeric
                    style="height: 35px; width: 100%; border: 1px solid #bdb2b2; border-radius: 3px;"
                    v-model="vaqt"
                    @input="qoladiganKun"
                    separator="space"
                  ></vue-numeric>
                </div>
                <div style="width: 20%">
                  <div>Кетиш вақт</div>
                  <date-picker
                    style="width: 100%"
                    @input="KetishVaqti"
                    v-model="palata.date_do"
                    format="DD.MM.YYYY"
                    value-type="X"
                    type="datetime"
                    :lang="lang"
                  ></date-picker>
                </div>
                <div style="width: 20%">
                  <div>Сумма</div>
                  <vue-numeric
                    style="height: 35px; width: 100%"
                    :disabled="true"
                    separator="space"
                    v-model="PalataSumma"
                    :precision="2"
                  ></vue-numeric>
                </div>
                <div>
                  <button
                    :disabled="this.localUser.role == 'Registrator' || this.localUser.role == 'Kasser'"
                    v-b-modal.modal-2
                    class="navbarBtn mt-3"
                    variant="primary"
                    @click="getPalata()"
                  >
                    Палаталарни кўриш
                  </button>
                  <b-modal id="modal-2" size="lg" title="Палаталар" hide-footer>
                    <div>
                      <div class="mb-2 modalQidiruv">
                        <b-form-group
                          label-for="filterPalata-input"
                          label-cols-sm="1"
                          label-align-sm="right"
                          label-size="sm"
                          class="mb-0"
                        >
                          <b-input-group size="sm">
                            <b-form-input
                              id="filterPalata-input"
                              v-model="filterPalata"
                              type="search"
                              placeholder="Қидирув"
                            ></b-form-input>

                            <b-input-group-append>
                              <b-button
                                :disabled="!filterPalata"
                                variant="danger"
                                @click="filterPalata = ''"
                                >Тозалаш
                              </b-button>
                            </b-input-group-append>
                          </b-input-group>
                        </b-form-group>
                      </div>
                      <div>
                        <div class="modalOverflow">
                          <b-table
                            ref="refPalataTable"
                            :tbody-tr-class="RowClass"
                            hover
                            sort-icon-left
                            primary-key="id"
                            :items="itemsPalata"
                            :fields="fieldsPalata"
                            :filter="filterPalata"
                            :per-page="perPagePalata"
                            :current-page="currentPagePalata"
                            :filter-included-fields="filterOnPalata"
                            :sort-by.sync="sortByPalata"
                            @row-clicked="RowClickedPalata"
                            :sort-desc.sync="sortDescPalata"
                            :sort-direction="sortDirectionPalata"
                            stacked="md"
                            show-empty
                            small
                            @filtered="onFilteredPalata"
                          >
                            <template #cell(№)="data">
                              {{ data.index + 1 }}
                            </template>
                          </b-table>
                        </div>
                      </div>
                    </div>
                  </b-modal>
                </div>
              </div>
              <b-row
                style="padding: 5px 15px"
                v-if="this.user.registration_palata.length != 0"
              >
                <table
                  class="table table-sm table-bordered"
                  style="background: #fff;"
                >
                  <thead class="shifokorTable">
                    <tr>
                      <th style="width: 30px;">№</th>
                      <th>Ходим</th>
                      <th>Номи</th>
                      <th>Кунлик нарҳи</th>
                      <th>Келган кун</th>
                      <th>Кетган кун</th>
                      <th>Куни</th>
                      <th>Сумма</th>
                      <th style="width: 40px;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in user.registration_palata"
                      :key="index"
                      :class="{ bg: index % 2 == 1 }"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <!-- style="width: 200px;" -->
                        <v-select
                          class="TekshiruvchiIndex"
                          :options="hodim"
                          label="user_name"
                          :reduce="option => option.id"
                        />
                      </td>
                      <td>{{ item.palatas != null ? item.palatas.name:''}}</td>
                      <td>{{ item.price | numFormat }}</td>
                      <td>{{ item.date_to | moment }}</td>
                      <td>{{ item.date_do | moment }}</td>
                      <td>{{ item.day }}</td>
                      <td>{{ item.total_price | numFormat }}</td>
                      <td>
                        <b-button
                          :disabled="
                            user.backlog == 0 &&
                              $route.name == 'User Profile Update'
                          "
                          style="width: 30px; height: 30px; display: flex; justify-content: center;"
                          @click="deletePalata(index)"
                          variant="outline-danger"
                        >
                          <b-icon style="width: 17px;" icon="trash"></b-icon>
                        </b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-row>
            </b-tab>
            
            <b-tab
              v-if="
                localUser.role != 'Kasser' &&
                  localUser.role != 'Registrator' &&
                  localUser.role != 'Loborant'
              "
              title="Назначения"
              title-link-class="text-primary"
              style="padding: 10px;"
            >
              <div v-if="this.user.registration_doctor.length != 0">
                <b-card no-body>
                  <b-tabs v-model="tabIndexShifokor" card>
                    <b-tab
                      v-for="(item, index1) in user.registration_doctor"
                      :key="index1"
                      :title="item.doctor.name"
                      :title-link-class="linkClassShifokor(index1)"
                      style="background: #F7F7F7; padding: 5px"
                    >
                      <div>
                        <div class="TashxisLabel">
                          <label>Ташхис</label>
                          <div :class="{ Arxive: $route.name == 'ArxivOne' }">
                            <button
                              v-if="
                                localUser.role == 'Shifokor' &&
                                  localUser.doctor_id == item.doctor_id
                              "
                              class="navbarBtnTashxis"
                              v-b-modal.modal-7
                              @click="getShablon"
                            >
                              <b-icon icon="collection"></b-icon>
                            </button>
                          </div>
                          <div
                            class="ml-3"
                            :class="{ Arxive: $route.name == 'ArxivOne' }"
                          >
                            <button
                              v-if="
                                localUser.role == 'Shifokor' &&
                                  localUser.doctor_id == item.doctor_id
                              "
                              class="navbarBtnTashxis"
                              v-b-modal.modal-9
                              @click="getMkb"
                            >
                              MKB-10
                            </button>
                          </div>
                          <b-modal
                            id="modal-9"
                            size="xl"
                            title="MKB-10"
                            hide-footer
                          >
                            <div class="mkbStyle">
                              <div
                                style="padding: 5px"
                                v-for="(itemMkb, index) in mkb"
                                :key="index"
                              >
                                <button
                                  class="navbarBtnTashxismkb"
                                  v-b-toggle="'index-' + index"
                                >
                                  <b-icon
                                    font-scale="1.5"
                                    icon="file-earmark-plus"
                                  ></b-icon>
                                </button>
                                <b-badge variant="success">{{
                                  itemMkb.code
                                }}</b-badge>
                                {{ itemMkb.name }}
                                <b-collapse
                                  style="padding: 0 10px;"
                                  :id="'index-' + index"
                                  class="mt-2"
                                >
                                  <b-card
                                    v-for="(childItem,
                                    childIndex) in itemMkb.inspection_child"
                                    :key="childIndex"
                                  >
                                    <!-- <p class="card-text">Collapse contents Here</p> -->
                                    <button
                                      class="navbarBtnTashxismkb"
                                      v-b-toggle="'childIndex-' + childIndex"
                                    >
                                      <b-icon
                                        icon="file-earmark-plus"
                                      ></b-icon></button
                                    ><b-badge
                                      variant="success"
                                      class="ml-1 mr-1"
                                      >{{ childItem.code }}</b-badge
                                    >{{ childItem.name }}
                                    <b-collapse
                                      :id="'childIndex-' + childIndex"
                                      class="mt-2"
                                    >
                                      <b-card
                                        v-for="(childItemChild,
                                        ind) in childItem.inspection_child2"
                                        :key="ind"
                                        @click="rowClickMkb(childItemChild)"
                                      >
                                        <b-badge
                                          variant="success"
                                          class="mr-1"
                                          >{{ childItemChild.code }}</b-badge
                                        >{{ childItemChild.name }}
                                      </b-card>
                                    </b-collapse>
                                  </b-card>
                                </b-collapse>
                              </div>
                            </div>
                          </b-modal>
                        </div>
                        <div>
                          <b-modal
                            id="modal-7"
                            size="lg"
                            title="Шаблонлар рўйхати"
                            hide-footer
                          >
                            <div>
                              <div
                                style="display: flex; justify-content: space-between;"
                              >
                                <button
                                  class="navbarBtnTashxis mb-2"
                                  v-b-modal.modal-8
                                >
                                  <b-icon icon="plus-lg"></b-icon>
                                </button>
                                <b-form-group
                                  label-for="filterTekshiruvlar-input"
                                  label-cols-sm="1"
                                  label-align-sm="right"
                                  label-size="sm"
                                  class="mb-2 col-8"
                                >
                                  <b-input-group size="sm">
                                    <b-form-input
                                      id="filterTekshiruvlar-input"
                                      v-model="filterShablon"
                                      type="search"
                                      placeholder="Қидирув"
                                    ></b-form-input>

                                    <b-input-group-append>
                                      <b-button
                                        :disabled="!filterShablon"
                                        variant="danger"
                                        @click="filterShablon = ''"
                                      >
                                        Тозалаш</b-button
                                      >
                                    </b-input-group-append>
                                  </b-input-group>
                                </b-form-group>
                              </div>
                              <div>
                                <div class="modalOverflow">
                                  <b-table
                                    id="bemor-table"
                                    ref="refShablonTable"
                                    hover
                                    sort-icon-left
                                    striped
                                    primary-key="id"
                                    :items="itemsShablon"
                                    :fields="fieldsShablon"
                                    :filter="filterShablon"
                                    :per-page="perPageShablon"
                                    :current-page="currentPageShablon"
                                    :filter-included-fields="filterOnShablon"
                                    :sort-by.sync="sortByShablon"
                                    :sort-desc.sync="sortDescShablon"
                                    :sort-direction="sortDirectionShablon"
                                    @row-clicked="RowClickedShablon"
                                    stacked="md"
                                    show-empty
                                    small
                                    @filtered="onFilteredShablon"
                                  >
                                    <template #cell(№)="data">
                                      {{ data.index + 1 }}
                                    </template>
                                  </b-table>
                                </div>
                              </div>
                            </div>
                          </b-modal>
                          <b-modal
                            id="modal-8"
                            title="Шифокор Шаблон"
                            hide-footer
                          >
                            <div
                              class="md-layout-item md-small-size-100 md-size-100"
                            >
                              <span class="shirift">
                                Номи
                              </span>
                              <span style="color: red;">*</span>
                              <span v-if="errorsShablon != null">
                                <span
                                  style="color: red; font-size: 9px"
                                  v-if="!errorsShablon.name.required"
                                  >Ном тўлдирилиши керак</span
                                >
                                <span
                                  style="color: red; font-size: 9px"
                                  v-if="!errorsShablon.name.minLength"
                                  >Ном камида 4 та белги бўлиши керак</span
                                >
                              </span>
                              <b-input
                                id="Shablon-name"
                                type="text"
                                v-model="ShablonShifokor.name"
                              />
                            </div>
                            <div class="CreateName">
                              <b-button
                                class="modalBtn1"
                                size="sm"
                                style="height: 37px;"
                                variant="danger "
                                @click="ShifokorShablonClose()"
                              >
                                <b-icon icon="calendar2-x"></b-icon>
                                Бекор қилиш
                              </b-button>
                              <b-button
                                class="mt-3 ml-2 modalBtn"
                                @click="ShifokorShablon()"
                                variant="success"
                              >
                                <b-icon icon="calendar2-plus"></b-icon>
                                Сақлаш
                              </b-button>
                            </div>
                          </b-modal>
                        </div>
                        <!-- <b-form-textarea
                        :disabled="
                          !(
                            localUser.role == 'Shifokor' &&
                            localUser.doctor_id == item.doctor_id
                           )
                        "
                        id="textarea"
                        @input="ShifokorText(index1)"
                        v-model="item.text"
                      ></b-form-textarea> -->
                        <div
                          class="overflow1"
                          :class="{ Arxive: $route.name == 'ArxivOne' }"
                        >
                          <ckeditor
                            v-model="item.text"
                            :editor="editor"
                            @input="ShifokorText(index1)"
                            :config="editorConfig"
                            :disabled="
                              !(
                                localUser.role == 'Shifokor' &&
                                localUser.doctor_id == item.doctor_id
                              )
                            "
                          >
                          </ckeditor>
                          <!-- <textarea style="width: 100%;padding: 12px 20px;box-sizing: border-box;border: 2px solid #ccc;border-radius: 4px;background-color: #f8f8f8;font-size: 16px;" 
                              cols="25" rows="2"
                              v-model="item.text"
                              @input="ShifokorText(index1)"
                              :disabled="
                              !(
                                localUser.role == 'Shifokor' &&
                                localUser.doctor_id == item.doctor_id
                              )"
                              >
                          </textarea> -->
                          <span
                            style="z-index: 11"
                            :class="{ Arxive: $route.name == 'ArxivOne' }"
                            v-for="(info, infoIndex) in item.register_mkb"
                            :key="infoIndex"
                          >
                            {{ info.name }}
                            <button
                              class="btn btn-warning"
                              :disabled="localUser.doctor_id != item.doctor_id"
                              @click="DeleteInfo(index1, infoIndex)"
                            >
                              x
                            </button>
                          </span>
                        </div>
                      </div>
                    </b-tab>
                  </b-tabs>
                </b-card>
              </div>
            </b-tab>
            <b-tab
              title="Рецепт"
              v-if="
                localUser.role != 'Kasser' &&
                  localUser.role != 'Registrator' &&
                  localUser.role != 'Loborant'
              "
              title-link-class="text-primary"
              style="background: #F7F7F7; padding: 10px"
            >
              <b-row v-if="this.user.registration_doctor.length != 0">
                <div :class="{ Arxive: $route.name == 'ArxivOne' }">
                  <button
                    class="mt-1 ml-3 mr-2 tabsBtns"
                    v-b-modal.DorilarModal
                    variant="primary"
                  >
                    Дори қўшиш
                  </button>

                  <b-modal id="DorilarModal" title="Дори қўшиш" hide-footer>
                    <div class="md-layout-item md-small-size-100 md-size-100">
                      <span class="shirift">
                        Дори номи
                      </span>
                      <span style="color: red;">*</span>
                      <span v-if="errorsDori !== null">
                        <span
                          style="color: red; font-size: 9px"
                          v-if="!errorsDori.name.required"
                          >Дори тўлдирилиши керак</span
                        >
                        <span
                          style="color: red; font-size: 9px"
                          v-if="!errorsDori.name.minLength"
                          >Дорида камида 4 та белги бўлиши керак</span
                        >
                      </span>
                      <b-input
                        id="dorilar-name"
                        style="background: #fff; border: 1px solid #ced4da;"
                        type="text"
                        v-model="DorilarQoshish.name"
                      />
                    </div>
                    <div class="CreateName">
                      <b-button
                        class="modalBtn1"
                        size="sm"
                        style="height: 37px;"
                        variant="danger "
                        @click="DoriClose()"
                      >
                        <b-icon icon="calendar2-x"></b-icon>
                        Бекор қилиш
                      </b-button>
                      <b-button
                        class="mt-3 ml-2 modalBtn"
                        @click="DoriSaqlash()"
                        variant="success"
                      >
                        <b-icon icon="calendar2-plus"></b-icon>
                        Сақлаш
                      </b-button>
                    </div>
                  </b-modal>
                </div>
              </b-row>
              <b-row v-if="this.user.registration_doctor.length != 0">
                <b-col class="mt-2">
                  <div>
                    <b-card no-body>
                      <b-tabs v-model="tabIndexDorilar" card>
                        <b-tab
                          :title-link-class="linkClassDorilar(index2)"
                          v-for="(item, index2) in user.registration_doctor"
                          :key="index2"
                          :title="item.doctor.name"
                        >
                          <div class="dorilar">
                            <table class="table table-sm table-bordered">
                              <thead class="shifokorTable">
                                <tr>
                                  <th
                                    style="width: 30px;"
                                    :class="{
                                      Arxive: $route.name == 'ArxivOne'
                                    }"
                                  >
                                    <!-- :disabled="
                                        !(
                                          localUser.role == 'Shifokor' &&
                                          localUser.doctor_id == item.doctor_id
                                        )
                                      " -->
                                    <b-button
                                      variant="success"
                                      @click="Add(index2)"
                                      style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;"
                                      ><span>
                                        <b-icon
                                          icon="plus"
                                          color="#fff"
                                        ></b-icon> </span
                                    ></b-button>
                                  </th>
                                  <th>
                                    Номи
                                  </th>
                                  <th>Кун</th>
                                  <th>Маҳал</th>
                                  <th>Изоҳ</th>
                                  <th style="width: 40px;"></th>
                                </tr>
                              </thead>
                              <tbody v-b-scrollspy="1">
                                <tr
                                  v-for="(itemsr,
                                  index1) in item.registration_recipe"
                                  :key="index1"
                                  :class="{ bg: index1 % 2 == 1 }"
                                >
                                  <td>{{ index1 + 1 }}</td>
                                  <td
                                    style="width: 250px;"
                                    :class="{
                                      Arxive: $route.name == 'ArxivOne'
                                    }"
                                  >
                                    <v-select
                                      style="width: 100%; background: #fff;"
                                      label="name"
                                      :options="itemsDorilar"
                                      @search="SearchDorilar(e)"
                                      :reduce="option => option.id"
                                      @input="
                                        DoriName(itemsr.pill_id, index2, index1)
                                      "
                                      v-model="itemsr.pill_id"
                                    />
                                  </td>
                                  <td
                                    :class="{
                                      Arxive: $route.name == 'ArxivOne'
                                    }"
                                  >
                                    <b-input
                                      type="number"
                                      style="background: #fff; border: 1px solid #ced4da;"
                                      v-model="itemsr.day"
                                    ></b-input>
                                  </td>
                                  <td
                                    :class="{
                                      Arxive: $route.name == 'ArxivOne'
                                    }"
                                  >
                                    <b-input
                                      type="number"
                                      style="background: #fff; border: 1px solid #ced4da;"
                                      v-model="itemsr.time"
                                    ></b-input>
                                  </td>
                                  <td
                                    :class="{
                                      Arxive: $route.name == 'ArxivOne'
                                    }"
                                  >
                                    <b-input
                                      style="background: #fff; border: 1px solid #ced4da;"
                                      v-model="itemsr.comment"
                                      @keydown.tab="Add(index2)"
                                    ></b-input>
                                  </td>
                                  <td
                                    :class="{
                                      Arxive: $route.name == 'ArxivOne'
                                    }"
                                  >
                                    <b-button
                                      style="width: 35px; height: 35px; display: flex; justify-content: center;"
                                      @click="deleteDorilar(item, index1)"
                                      variant="outline-danger"
                                    >
                                      <b-icon
                                        style="width: 17px;"
                                        icon="trash"
                                      ></b-icon>
                                    </b-button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </b-tab>
                      </b-tabs>
                    </b-card>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab
              title="Текширув натижалари"
              title-link-class="text-primary"
              style="padding: 10px"
            >
            <div v-if="this.user.registration_inspection.length != 0">
                <b-card no-body>
                  <b-tabs v-model="tabI" card>
                    <b-tab
                      :title="items.inspection.name"
                      v-for="(items, index2) in user.registration_inspection"
                      :key="index2"
                      style="background: #F7F7F7; padding: 3px !important;"
                      :title-link-class="link(index2)"
                    >
                      <div
                        :class="{ Arxive: $route.name == 'ArxivOne' }"
                        style="display: flex; background: rgba(7, 100, 172, 0.058823529411764705); border-top-left-radius: 3px; border-top-right-radius: 3px; justify-content: space-between; padding: 0 20px 0 20px;"
                      >
                        <div style="display: flex; align-items: center;">
                          <span
                            style="font-size: 18px;  color: #3f51b5; font-weight: 600;"
                          >
                            {{ items.inspection.name }}
                          </span>
                        </div>
                        <div style="display: flex; align-items: center;">
                          <span
                            style="font-size: 18px;  color: #3f51b5; font-weight: 600;"
                          >
                          Текширув нарҳи
                            <span>{{ items.price | numFormat }}</span>
                          </span>
                        </div>

                        <div style="display: flex;">
                          <div class="LabelTekshiruvchi">
                            <!-- pointer-events: none; -->
                            <div style="width: 250px; ">
                              <span style=" color: #3f51b5; font-weight: 600;"
                                >Текширув вақти</span
                              >
                              <date-picker
                                style="width: 100%;"
                                v-model="items.date_time"
                                format="DD.MM.YYYY HH:mm"
                                value-type="X"
                                type="datetime"
                                :lang="lang"
                              ></date-picker>
                            </div>
                            <div style="width:250px; margin-left: 10px;">
                              <span style=" color: #3f51b5; font-weight: 600;"
                                >Текширувчи</span
                              >
                              <v-select
                                class="TekshiruvchiIndex"
                                label="user_name"
                                :options="Tekshiruvchi"
                                :reduce="option => option.id"
                                v-model="items.user_id"
                              />
                            </div>
                          </div>
                          <div>
                            <b-button
                              style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; margin-top: 10px;"
                              @click="deleteTekshiruv(index2)"
                              variant="danger"
                            >
                              <b-icon
                                style="width: 17px;"
                                icon="trash"
                              ></b-icon>
                            </b-button>
                          </div>
                        </div>
                      </div>

                      <div class="overflow">
                        <table class="table table-sm table-bordered">
                          <thead class="shifokorTable">
                            <tr>
                              <!-- <th>№</th> -->
                              <th v-if="items.type == true">Танлаш</th>
                              <th>Номи</th>
                              <th>Сумма</th>
                              <th>Натижа</th>
                              <th>Норма</th>
                              <th>Ранги</th>
                              <th style="width: 95px">Файли</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item,
                              index1) in items.registration_inspection_child"
                              :key="index1"
                              :class="{ bg: index1 % 2 == 1 }"
                            >
                              <!-- <td>{{ index1 + 1 }}</td> -->
                              <td
                                v-if="items.type == true"
                                :class="{ Arxive: $route.name == 'ArxivOne' }"
                              >
                                <!-- :disabled="localUser.id != items.user_id" -->
                                <b-form-checkbox
                                  v-model="item.checked"
                                  @change="Chakked(items, index1, index2)"
                                  name="checkbox-1"
                                  value="true"
                                >
                                </b-form-checkbox>
                              </td>
                              <td>{{ item.name }}</td>
                              <td>{{ item.price | numFormat }}</td>
                              <td
                                :class="{ Arxive: $route.name == 'ArxivOne' }"
                                style="padding: 8px;"
                              >
                                <!-- <ckeditor
                                  style="z-index: 3; width: 80%;"
                                  v-model="item.text"
                                  :editor="editor"
                                  :config="editorConfig"
                                  :disabled="localUser.id != items.user_id"
                                  @input="ChangeStatus(index1, index2)"
                                >
                                </ckeditor> -->
                                <textarea style="width: 100%;padding: 12px 20px;box-sizing: border-box;border: 2px solid #ccc;border-radius: 4px;background-color: #f8f8f8;font-size: 16px;" 
                                    cols="25" rows="2"
                                    v-model="item.text"
                                    :disabled="localUser.id != items.user_id"
                                    @input="ChangeStatus(index1, index2)"
                                ></textarea>
                              </td>
                              <td>{{ item.norm }}</td>
                              <td style="width: 250px;">
                                <div style="display: flex;align-items: center; justify-content: space-around;">
                                  <div class="radio-to radio-red" :class="{ radioDisabled: localUser.id != items.user_id }" >
                                    <input :disabled="localUser.id != items.user_id" :class="{ radioDisabled: localUser.id != items.user_id }" type="radio" :id="'ins_'+index2+'_red_'+index1" value="qizil" v-model="item.rang">
                                    <label :for="'ins_'+index2+'_red_'+index1" :class="{ radioDisabled: localUser.id != items.user_id }">Қизил</label>
                                  </div> 
                                  <div class="radio-to radio-green" :class="{ radioDisabled: localUser.id != items.user_id }">
                                    <input :disabled="localUser.id != items.user_id" :class="{ radioDisabled: localUser.id != items.user_id }" type="radio" :id="'ins_'+index2+'_green_'+index1" value="yashil" v-model="item.rang">
                                    <label :for="'ins_'+index2+'_green_'+index1" :class="{ radioDisabled: localUser.id != items.user_id }">Яшил</label>
                                  </div>
                                  
                                </div> 
                              </td>
                              <td
                                :class="{ Arxive: $route.name == 'ArxivOne' }"
                              >
                                <label
                                  :for="'ins_' + index2 + '_files_' + index1"
                                  class="btn btn-primary btn-sm"
                                >
                                  <b-icon icon="cloud-arrow-up-fill"></b-icon
                                  >Юклаш
                                </label>
                                <input
                                  style="display: none;"
                                  :disabled="localUser.id != items.user_id"
                                  :id="'ins_' + index2 + '_files_' + index1"
                                  type="file"
                                  @change="onFileSelected(index1, index2)"
                                />
                                <br />
                                <span v-if="item.file != ''">
                                  <img
                                    @click="OpenModal(item.file)"
                                    :src="item.file"
                                    width="80px"
                                  />
                                </span>
                              </td>
                              <b-modal
                                v-model="modalShow"
                                :id="'ins_' + index2 + '_files_' + index1"
                                size="lg"
                                hide-footer
                                style="text-align: center ;"
                              >
                                <p style="text-align: center;">
                                  111
                                  <img :src="imgModal" width="63%" alt="" />
                                </p>
                              </b-modal>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </b-tab>
                  </b-tabs>
                </b-card>
              </div>
            </b-tab>

            <b-tab
              title="Ташхис натижалари"
              v-if="
                localUser.role != 'Kasser' &&
                this.$route.name != 'ArxivOne' ||
                localUser.role == 'Loborant'
              "
              title-link-class="text-primary"
              style="padding: 10px"
            >
              <table
                v-if="this.user.registration_files.length != 0"
                class="table table-sm table-bordered"
                style="background: #fff;"
              >
                <thead class="shifokorTable">
                  <tr>
                    <th>№</th>
                    <th>Номи</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in user.registration_files"
                    v-b-modal.modal-11
                    :key="index"
                    :class="{ bg: index % 2 == 1 }"
                  >
                    <!-- @click="downloadFile(item.href, index)" -->
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ item.href }}
                      <!-- <img :src="item.href.file" width="60px" /> -->
                    </td>
                    <td>
                      <a
                        :href="`${axios.defaults.baseURL}/` + item.href"
                        target="_blank"
                        class="btn btn-info btn-sm text-white"
                        ><i class="fas fa-eye"></i>&ensp; Кўриш
                      </a>
                    </td>
                    <!-- <b-modal
                      id="modal-11"
                      size="lg"
                      title="Tekshiruv fayli"
                      hide-footer
                    >
                      <img :src="item.href.file" />
                    </b-modal> -->
                  </tr>
                </tbody>
              </table>
            </b-tab>
            
            <b-tab
              v-if="
                localUser.role == 'Kasser' ||
                  localUser.role == 'Admin' ||
                  localUser.role == 'Dasturchi'
              "
              title="Тўлов"
              title-link-class="text-primary"
              style="padding: 10px;"
            >
              <div style="display: flex; justify-content: space-between;">
                <div style="width: 82.5%;">
                  <table
                    class="table table-sm table-bordered"
                    style="background: #fff;"
                  >
                    <div class="tolovjadvali">
                      <thead class="shifokorTable">
                        <tr>
                          <th style="width: 3%;">№</th>
                          <th style="width: 16%;">Сумма</th>
                          <th style="width: 16%;">Скидка</th>
                          <th style="width: 15%;">Тўлов тури</th>
                          <th style="width: 30%;">Изоҳ</th>
                          <th style="width:15%;">Ходим</th>
                          <th style="width: 35%;">Филиал</th>
                          <th style="width: 15%;">Сана</th>
                          <th style="width: 5%;"></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          v-for="(item, index) in user.registration_pay"
                          :key="index"
                          :class="{ bg: index % 2 == 1 }"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ item.summa | numFormat }}</td>
                          <td>{{ item.discount | numFormat }}</td>
                          <td>{{ item.pay_type }}</td>
                          <td>{{ item.comment }}</td>
                          <td>{{ item.user ? item.user.user_name: payer_name }}</td>
                          <td>
                            {{ item.filial != null ? item.filial.name : "" }}
                          </td>
                          <td>{{ item.date_time | moment }}</td>
                          <td :class="{ Arxive: $route.name == 'ArxivOne' }">
                            <b-button
                              style="width: 30px; height: 30px; display: flex; justify-content: center;"
                              @click="deleteSumma(index)"
                              variant="outline-danger"
                            >
                              <b-icon
                                style="width: 17px;"
                                icon="trash"
                              ></b-icon>
                            </b-button>
                          </td>
                        </tr>
                      </tbody>
                    </div>
                  </table>
                  <div class="TolovContent">
                    <div class="disablei">
                      <div class="labell1">Тўланган сумма</div>
                      <div
                        class="Summalar"
                        :class="{ colorp: this.user.pay_summa }"
                      >
                        {{ user.pay_summa | numFormat }}
                      </div>
                    </div>

                    <div class="disablei">
                      <div class="labell1">Скидка сумма</div>
                      <div class="Summalar">
                        {{ user.discount | numFormat }}
                      </div>
                    </div>
                    <div class="disablei">
                      <div class="labell1">Қарздорлик</div>
                      <div
                        class="Summalar"
                        :class="{ color: this.user.backlog }"
                      >
                        {{ user.backlog | numFormat }}
                      </div>
                    </div>
                    <div
                      class="disableiIzoh"
                      :class="{ Arxive: $route.name == 'ArxivOne' }"
                    >
                      <div class="labell1">Изоҳ</div>
                      <input type="text" v-model="comment" />
                    </div>
                  </div>
                </div>
                <div
                  class="TolovSumma"
                  :class="{ Arxive: $route.name == 'ArxivOne' }"
                >
                  <div>
                    <div class="labell">Сумма</div>
                    <vue-numeric
                      class="numberic"
                      :disabled="!this.user.backlog"
                      separator="space"
                      v-model="summa"
                      :precision="2"
                    ></vue-numeric>
                  </div>
                  <div>
                    <div class="labell">Скидка</div>
                    <vue-numeric
                      class="numberic"
                      :disabled="!this.user.backlog"
                      separator="space"
                      v-model="Tolov.discount"
                      :precision="2"
                    ></vue-numeric>
                  </div>
                  <div>
                    <div class="labell">Филиал</div>
                    <v-select
                      :options="filials"
                      label="name"
                      :reduce="option => option.id"
                      v-model="Tolov.filial_id"
                      disabled
                    />
                  </div>

                  <!-- </b-row> -->
                  <div>
                    <div class="labell">Тўлов тури</div>
                    <v-select
                      class="qidiruvselecta"
                      label="name"
                      :components="{ Deselect }"
                      :options="TolovTuri"
                      v-model="Tolov.pay_type"
                    />
                  </div>
                  <div
                    style="display: flex; justify-content: space-between; width: 100%;"
                  >
                    <!-- <div
                  style="display: flex; justify-content: space-between"
                > -->
                    <button class="tabsBtnsSaqlash" @click="ChekTolovlar">
                      Чек
                      <b-spinner small v-if="sending"></b-spinner>
                    </button>

                    <button class="tabsBtnsSaqlash" @click="Tolovlar">
                      Тўлов
                    </button>
                    <!-- </div> -->
                  </div>
                </div>
              </div>
            </b-tab>
            <b-tab
              title="Чоп етиш"
              v-if="
                localUser.role != 'Kasser'
              "
              title-link-class="text-primary"
            >
           
              <div class="ChopEtish">
                <button class="ChopEtishBtn" @click="Bayonot">
                  <b-spinner small v-if="sending"></b-spinner>
                  <b-icon icon="printer-fill"></b-icon> Шикоят чоп этиш
                </button>
                <button class="ChopEtishBtn" @click="Tekshiruvlar">
                  <b-icon icon="printer-fill"></b-icon> Текширувлар
                </button>
                <!-- <button class="ChopEtishBtn" @click="Shartnoma">
                  <b-icon icon="printer-fill"></b-icon> Шартнома
                </button>
                <button class="ChopEtishBtn" @click="History">
                  <b-icon icon="printer-fill"></b-icon> History
                </button>
                <button class="ChopEtishBtn" @click="Malumotnoma">
                  <b-icon icon="printer-fill"></b-icon> Malumotnoma
                </button>
                <button class="ChopEtishBtn" @click="Shablon1">
                  <b-icon icon="printer-fill"></b-icon> К Ў Ч И Р М А № 187
                </button>
                <button class="ChopEtishBtn" @click="Shablon2">
                  <b-icon icon="printer-fill"></b-icon> Выписка № 181
                </button>
                <button class="ChopEtishBtn" @click="Shablon3">
                  <b-icon icon="printer-fill"></b-icon> Выписка № 121
                </button>
                <button class="ChopEtishBtn" @click="Shablon4">
                  <b-icon icon="printer-fill"></b-icon> К Ў Ч И Р М А № 9942
                </button> -->
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>

      <div
        class="notications xatoliklar alert-danger"
        style="z-index: 5"
        v-if="$store.state.errors != ''"
      >
        <button
          type="button"
          aria-hidden="true"
          class="close"
          @click="$store.state.errors = ''"
        >
          ×
        </button>
        <p><i class="fas fa-exclamation-triangle"></i>&nbsp; Хатолик</p>
        <div>{{ $store.state.errors }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { required, minLength } from "vuelidate/lib/validators";
import moment from "moment";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: { DatePicker },
  inject: ["BASE_URL"],
  data() {
    return {
      mkbFile: null,
      mkb: null,
      Deselect: {
        render: createElement => createElement("span", "")
      },
      selectedFile: null,
      img_id: 0,
      editor: ClassicEditor,
      
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
        language: 'ru',
      },
      // ChildPriceChacket: false,
      tabIndex: 0,
      tabIndexDorilar: 0,
      tabIndexShifokor: 0,
      tabI: 0,
      hodim:[],
      ChekChopEtish: false,
      search: {
        name: ""
      },
      sending: false,
      Imtiyoz: ["Imtiyozli", "Imtiyozsiz"],
      bemor: {
        fullname: "",
        name: "",
        lastname: "",
        patronymic: "",
        region_id: 2,
        imtiyoz_type: "Imtiyozsiz",
        district_id: null,
        phone: "",
        passport: "",
        addres: "",
        gender: "Ayol",
        citizen: false,
        percent: 0,
        birthday: 0
        // imtiyoz_type: "Imtiyozsiz"
      },
      checkedPrice: 0,
      naprovitel: {
        name: ""
      },
      localUser: JSON.parse(localStorage.getItem("user")),
      items: [],
      fields: [
        "№",
        { key: "fullname", label: "Ф.И.Ш", sortable: true },
        { key: "district.name", label: "Тумани", sortable: true },
        { key: "addres", label: "Манзили", sortable: true }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: "",
      filterOn: ["fullname"],
      selectedBemor: null,
      itemsShifokor: [],
      fieldsShifokor: [
        "№",
        { key: "name", label: "Ф.И.Ш", sortable: true },
        {
          key: "doctor_category.price",
          label: "Консултация нарҳи",
          sortable: true,
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat("ru-RU", {
              minimumFractionDigits: 2
            });
            return formatter.format(value);
          }
        },
        // {
        //   key: "doctor_category.citizen_price",
        //   label: "Фуқаролиги бўлмаган нарҳ",
        //   sortable: true,
        //   formatter: (value, key, item) => {
        //     let formatter = new Intl.NumberFormat("ru-RU", {
        //       minimumFractionDigits: 2
        //     });
        //     return formatter.format(value);
        //   }
        // }
      ],
      totalRowsShifokor: 1,
      currentPageShifokor: 1,
      perPageShifokor: 100,
      sortByShifokor: "",
      sortDescShifokor: false,
      sortDirectionShifokor: "asc",
      filterShifokor: null,
      filterOnShifokor: ["name"],

      itemsTekshiruvlar: [],
      Tekshiruvchi: [],
      fieldsTekshiruvlar: [
        "№",
        "Танлаш",
        { key: "name", label: "Текширувлар", sortable: true },
        {
          key: "price",
          label: "Текширув нарҳи",
          sortable: true,
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat("ru-RU", {
              minimumFractionDigits: 2
            });
            return formatter.format(value);
          }
        },
        // {
        //   key: "citizen_price",
        //   label: "Фуқаролиги бўлмаган нарҳ",
        //   sortable: true,
        //   formatter: (value, key, item) => {
        //     let formatter = new Intl.NumberFormat("ru-RU", {
        //       minimumFractionDigits: 2
        //     });
        //     return formatter.format(value);
        //   }
        // }
      ],
      totalRowsTekshiruvlar: 1,
      currentPageTekshiruvlar: 1,
      perPageTekshiruvlar: 100,
      sortByTekshiruvlar: "",
      sortDescTekshiruvlar: false,
      sortDirectionTekshiruvlar: "asc",
      filterTekshiruvlar: null,
      filterOnTekshiruvlar: ["name"],

      fieldsShablon: ["№", { key: "name", label: "Номи", sortable: true }],
      itemsShablon: [],
      totalRowsShablon: 1,
      currentPageShablon: 1,
      perPageShablon: 100,
      sortByShablon: "",
      sortDescShablon: false,
      sortDirectionShablon: "asc",
      filterShablon: null,
      filterOnShablon: ["name"],

      fieldsShikoyat: ["№", { key: "name", label: "Номи", sortable: true }],
      itemsShikoyat: [
        { id: 1, name: "1111" },
        { id: 2, name: "2222222" },
        { id: 3, name: "wwwwwwww" },
        { id: 4, name: "dedededede" },
        { id: 5, name: "yyyyyy" },
        { id: 6, name: "uuuuuuu" },
        { id: 7, name: "xxxxxxx" },
        { id: 8, name: "aaaaaaaaa" },
        { id: 9, name: "ggggggg" },
        { id: 10, name: "kkkkkkk" }
      ],
      totalRowsShikoyat: 1,
      currentPageShikoyat: 1,
      perPageShikoyat: 100,
      sortByShikoyat: "",
      sortDescShikoyat: false,
      sortDirectionShikoyat: "asc",
      filterShikoyat: null,
      filterOnShikoyat: ["name"],

      DorilarQoshish: {
        name: "",
        status: ""
      },
      ShablonShifokor: {
        id: 0,
        doctor_id: 0,
        name: ""
      },
      itemsDorilar: [],

      itemsPalata: [],
      fieldsPalata: [
        "№",
        { key: "name", label: "Номи", sortable: true },
        {
          key: "price",
          label: "Нарҳи",
          sortable: true,
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat("ru-RU", {
              minimumFractionDigits: 2
            });
            return formatter.format(value);
          }
        }
      ],
      totalRowsPalata: 1,
      currentPagePalata: 1,
      perPagePalata: 50,
      sortByPalata: "",
      sortDescPalata: false,
      sortDirectionPalata: "asc",
      filterPalata: null,
      filterOnPalata: ["name"],

      modalShow: false,
      imgModal: "",
      user: {
        user_id: 0,
        status: "waiting",
        patient_id: null,
        type_service: "Ambulator",
        direct_id: null,
        complaint:
          "<p><strong>Қон босими</strong>: </p><p><strong>Бўйи</strong>: </p><p><strong>Оғирлиги</strong>: </p><p><strong>Прописка</strong>: </p><p><strong>Тана харорати</strong>: </p><p><strong>Келган куни</strong>: </p><p><strong>Касби</strong>: </p><p><strong>Шикояти</strong>: </p> <ol><li></li></ol>",
        summa: 0,
        tramma_type: "Bir oydan ortiq",
        pay_summa: 0,
        backlog: 0,
        discount: 0,
        hospital_summa: 0,
        registration_doctor: [],
        registration_inspection: [],
        registration_palata: [],
        registration_pay: [],
        registration_files: []
      },
      comment: "",
      user_name: "",
      doctor_id: 0,
      XizmatTuri: ["Ambulator", "Statsionar"],
      TolovTuri: ["Naqt", "Plastik", "пречесления"],
      region: [],
      vaqt: 0,
      palata: {
        date_to: moment(new Date()).format("X"),
        date_do: 0,
        filial_id: JSON.parse(localStorage.getItem('filial_id'))
      },
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      langMM: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      Naprovitel: [],
      district: [],
      PalataSumma: 0,
      x: 0,
      summa: 0,
      Tolov: {
        user_id: JSON.parse(localStorage.getItem("user")).id,
        filial_id: JSON.parse(localStorage.getItem("filial_id")),
        pay_type: "Naqt",
        discount: 0
      },
      filials: [],
      // CheksizTolov: false,
      Tolov_table: [],
      dorilar: [],
      retsept: [],
      inspection_child: [],
      errors: null,
      errorsDori: null,
      errorsShablon: null,
      tipVaqt: "Bir oydan ortiq",
      checkArray:[],
      spinTekshiruv:false,
      selectedDate: null,
      TekshiruvParent:[],
      payer_name:"",
      branchName : "",
      premissionCheck:'off'
    };
    
  },
  validations: {
    bemor: {
      fullname: {
        required,
        minLength: minLength(4)
      },
      name: {
        required,
        minLength: minLength(4)
      },
      lastname: {
        required,
        minLength: minLength(4)
      },
      patronymic: {
        minLength: minLength(4)
      },
      phone: {
        required,
        minLength: minLength(9)
      },
      birthday: {
        required
      },
      gender: {
        required
      }
    },
    DorilarQoshish: {
      name: {
        required,
        minLength: minLength(4)
      }
    },
    ShablonShifokor: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },

  filters: {
    moment: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY");
      } else {
        return "";
      }
    },
    momentM: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY HH:mm");
      } else {
        return "";
      }
    }
  },
  created() {
    this.getUserInspektion();
    this.getPatient();
    this.getDorilar();
    this.getFilial();
  },
  methods: {
    // mkbClick(index) {
    //   if (this.mkbFile == null) {
    //     this.mkbFile = index;
    //   } else {
    //     this.mkbFile = null;
    //   }
    // },
    formatDatePicker(input){
      // const value = input.value.replace(/\D/g, ''); // Remove non-digit characters from the input
      // const day = value.slice(0, 2); // Extract the day portion
      // const month = value.slice(2, 4); // Extract the month portion
      // const year = value.slice(4, 8); // Extract the year portion

      // if (day && month && year) {
      //   const formattedDate = `${day}/${month}/${year}`; // Format the date as desired
      //   input.value = formattedDate; // Set the formatted date back to the input value
      // }
    },
    allowCheck(val){
      let  x = window.confirm("Ростан ҳам тугатмоқчимисиз");
      if(x){
        this.user.status = val;
      }else{
        this.user.status ='waiting'
      }
    },
    getFilial() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        self.filials = res.data.data;
      });
    },
    ArxivPush() {
      localStorage.setItem("ArxivId", this.bemor.id);
      const rout = this.$router.resolve({
        path: "/registration/archive"
      });
      window.open(rout.href, "_blank");
    },
    Arxiv() {
      let self = this;
      const x = window.confirm("Ростдан ҳам архивга оласизми?");
      if(x){
        axios({
          method: "get",
          url: "/registration/arxive"
        }).then(res => {
          if (res) {
            if (self.user.type_service == "Statsionar") {
              self.$router.push("/user/statsionar");
            } else {
              self.$router.push("/user");
            }
          }
        });
      }
    },
    onFileSelected(index1, index2) {
      let img = document.getElementById("ins_" + index2 + "_files_" + index1);
      const formData = new FormData();
      formData.append("href", img.files[0]);
      axios.post("uploads/imgs", formData).then(res => {
        this.user.registration_inspection[index2].registration_inspection_child[
          index1
        ].file = this.BASE_URL + res.data.img;
      });
    },
    myFilter(e) {
      let self = this;
      axios({
        method: "post",
        url: "/registration/search",
        data: {
          name: e
        }
      }).then(res => {
        self.items = res.data.data;
      });
    },
    Qidiruv(filter) {
      let self = this;
      // if (filter.length > 2) {
      axios({
        method: "post",
        url: "/registration/search",
        data: {
          name: filter
        }
      }).then(res => {
        self.items = res.data.data;        
      });
      // } else {
      //   return self.items;
      // }
    },
    selectedDateChange(date){
      let self = this;
      axios({
        method: "post",
        url: "/registration/search",
        data: {
          birthday:date
        }
      }).then(res => {
        self.items = res.data.data;
      });
    },

    Chakked(items, index1, index2) {
      let checkedTrue = Boolean(
        this.user.registration_inspection[index2].registration_inspection_child[
          index1
        ].checked
      );
      let childPrice = 0;
      if (this.bemor.citizen == false) {
        childPrice = Number(items.registration_inspection_child[index1].price);
      } else {
        childPrice = Number(
          items.registration_inspection_child[index1].citizen_price
        );
      }
      if (
        items.type == true &&
        this.bemor.imtiyoz_type != "Imtiyozli" &&
        this.user.tramma_type != "5 kun oralig'ida"
      ) {
        if (checkedTrue == true) {
          this.user.registration_inspection[
            index2
          ].registration_inspection_child[index1].status = "complate";
          this.user.summa += childPrice;
          this.user.backlog += childPrice;
          this.user.registration_inspection[index2].price += childPrice;
        } else {
          this.user.registration_inspection[
            index2
          ].registration_inspection_child[index1].status = "waiting";
          this.user.registration_inspection[index2].price -= childPrice;
          this.user.summa -= childPrice;
          this.user.backlog -= childPrice;
        }
      }
      // else if(items.type == true &&
      //   this.bemor.imtiyoz_type != "Imtiyozli" &&
      //   this.user.tramma_type != "5 kun oralig'ida" && this.bemor.citizen == true){
      //     if (checkedTrue == true) {
      //     this.user.registration_inspection[
      //       index2
      //     ].registration_inspection_child[index1].status = "complate";
      //     this.user.summa += childPrice;
      //     this.user.backlog += childPrice;
      //     this.user.registration_inspection[index2].price += childPrice;
      //   } else {
      //     this.user.registration_inspection[
      //       index2
      //     ].registration_inspection_child[index1].status = "waiting";
      //     this.user.registration_inspection[index2].price -= childPrice;
      //     this.user.summa -= childPrice;
      //     this.user.backlog -= childPrice;
      //   }
      //   }
    },
    OpenModal(img) {
      this.modalShow = true;
      this.imgModal = img;
    },
   
    Rasm(id) {
      this.img_id = id;
    },
    gethodim() {
      let self = this;
      axios({
        method: "get",
        url: "user/byName"
      }).then(res => {
        self.hodim = res.data.data;
      });
    },
    qoladiganKun() {
      if (this.vaqt !== " ") {
        let secondDay = moment
          .unix(parseInt(this.palata.date_to))
          .add(this.vaqt, "days");
        this.palata.date_do = moment(secondDay).format("X");
      }
    },
    KetishVaqti() {
      let x = this.palata.date_do - this.palata.date_to;
      this.vaqt = x / (3600 * 24);
    },
    findUsername(id){
      axios({
          method: "get",
          url: "/user/one/" + id
        }).then(res => {
          this.payer_name = res.data.data.user_name;
        });
    },
    Tolovlar() {
      let x = null;
      let tolanganUmumSum = null;
      tolanganUmumSum = this.summa + this.Tolov.discount;
      if (
        this.summa != 0 &&
        this.user.backlog != 0 &&
        tolanganUmumSum <= this.user.backlog
      ) {
        this.user.pay_summa += this.summa;
        this.user.discount += this.Tolov.discount;
        this.user.backlog =
          this.user.summa - (this.user.pay_summa + this.user.discount);
        let filial = JSON.parse(localStorage.getItem("user")).filial;
        x = {
          user_id: this.Tolov.user_id,
          pay_type: this.Tolov.pay_type,
          discount: this.Tolov.discount,
          backlog: this.user.backlog,
          summa: this.summa,
          comment: this.comment,
          umumiy_sum: this.user.summa,
          pay_summa: this.user.pay_summa,
          filial: filial,
          date_time: new Date()
            .valueOf()
            .toString()
            .slice(0, 10)
        };
        this.findUsername(this.Tolov.user_id)
        this.user.registration_pay.push(x);
        this.summa = 0;
        this.Tolov.discount = 0;
      } else {
        this.$bvToast.toast(`Summa xato kiritildi`, {
          title: "Ogohlantirish",
          autoHideDelay: 2000,
          variant: "danger",
          appendToast: true
        });
        // if (this.user.backlog < 0) {
        //   this.user.pay_summa -= this.summa;
        //   this.user.discount -= this.Tolov.discount;
        //   this.user.backlog =
        //     this.user.summa + (this.user.pay_summa + this.user.discount);
        // }
        // this.summa = 0;
        // this.Tolov.discount = 0;
      }
    },
    // ChopEtish() {
    //   this.ChekChopEtish = true;
    //   let self = this;
    //   if (self.$route.name == "User Profile Create" && self.user.patient_id && self.user.registration_doctor.length != 0) {
    //     axios({
    //       method: "post",
    //       url: "/registration/create",
    //       data: self.user
    //     }).then(data => {
    //       if (data) {
    //         axios({
    //           method: "get",
    //           url: "/registration/pechat/" + self.user.patient_id
    //         }).then(res => {
    //           localStorage.setItem("Navbat", JSON.stringify(res.data));
    //         });
    //         self.$router.push({ path: "/user" });
    //         const route = self.$router.resolve({
    //           path: "/user/navbatchek"
    //         });
    //         window.open(route.href, "_blank");
    //       }
    //     });
    //   } else {
    //     this.Saqlash();
    //     if (self.user.patient_id && self.user.registration_doctor.length != 0) {
    //       axios({
    //         method: "get",
    //         url: "/registration/pechat/" + self.user.patient_id
    //       }).then(res => {
    //         localStorage.setItem("Navbat", JSON.stringify(res.data));
    //       });
    //       self.$router.push({ path: "/user" });
    //       const yol = self.$router.resolve({
    //         path: "/user/navbatchek"
    //       });
    //       window.open(yol.href, "_blank");
    //     } else {
    //       this.$bvToast.toast(`!!!!!Bemor tanlanmagan`, {
    //         title: "Ogohlantirish",
    //         autoHideDelay: 2000,
    //         appendToast: true,
    //         variant: "danger"
    //       });
    //     }
    //   }
    // },
    ChekTolovlar() {
      let self = this;
      let x = null;
      this.ChekChopEtish = true;
      let tolanganUmumSum = null;
      tolanganUmumSum = this.summa + this.Tolov.discount;
      if (tolanganUmumSum <= this.user.backlog && this.sending == false) {
        this.user.pay_summa += this.summa;
        this.user.discount += this.Tolov.discount;
        this.user.backlog =
          this.user.summa - (this.user.pay_summa + this.user.discount);
        let filial = JSON.parse(localStorage.getItem("user")).filial;
        x = {
          user_id: this.Tolov.user_id,
          pay_type: this.Tolov.pay_type,
          discount: this.Tolov.discount,
          backlog: this.user.backlog,
          summa: this.summa,
          comment: this.comment,
          palata: this.user.registration_palata,
          umumiy_sum: this.user.summa,
          pay_summa: this.user.pay_summa,
          filial: filial,
          date_time: new Date()
            .valueOf()
            .toString()
            .slice(0, 10)
        };
        if (this.summa != 0) {
          this.user.registration_pay.push(x);
        }
        this.sending = true;
        if (this.$route.name == "User Profile Update") {
          let Statsionar = {
            Shifokor: {},
            Tekshiruv: {},
            Palata: {}
          };
          if (self.user.type_service !== "Ambulator") {
            Statsionar.Shifokor = {
              summ: 0,
              shifokor: []
            };
            self.user.registration_doctor.forEach(el => {
              Statsionar.Shifokor.summ += el.price;
              self.user.registration_doctor.forEach(e => {
                const ind = Statsionar.Shifokor.shifokor.findIndex(
                  x => x.id === e.doctor_id
                );
                if (ind === -1 && e.doctor_id == el.doctor_id) {
                  const count = self.user.registration_doctor.filter(
                    val => val.doctor_id == el.doctor_id
                  ).length;
                  Statsionar.Shifokor.shifokor.push({
                    name: el.doctor.name,
                    price: el.price,
                    count: count
                  });
                }
              });
            });
            Statsionar.Tekshiruv = {
              summ: 0,
              tekshiruv: []
            };
            self.user.registration_inspection.forEach(el => {
              Statsionar.Tekshiruv.summ += el.price;
              self.user.registration_inspection.forEach(e => {
                const inx = Statsionar.Tekshiruv.tekshiruv.findIndex(
                  x => x.id === e.inspection_id
                );
                if (inx === -1 && e.inspection_id == el.inspection_id) {
                  const count = self.user.registration_inspection.filter(
                    val => val.inspection_id == el.inspection_id
                  ).length;
                  Statsionar.Tekshiruv.tekshiruv.push({
                    id: e.inspection_id,
                    name: e.inspection.name,
                    price: e.price,
                    count: count
                  });
                }
              });
            });
            Statsionar.Palata = {
              kelgan: null,
              ketgan: null,
              summ: 0,
              palata: []
            };
            let uzunlik = self.user.registration_palata.length;
            Statsionar.Palata.kelgan = self.user.registration_palata[0].date_to;
            Statsionar.Palata.ketgan =
              self.user.registration_palata[uzunlik - 1].date_do;
            self.user.registration_palata.forEach(el => {
              Statsionar.Palata.summ += el.total_price;
              self.user.registration_palata.forEach(e => {
                const i = Statsionar.Palata.palata.findIndex(
                  x => x.id === e.palata_id
                );
                if (i === -1 && e.palata_id == el.palata_id) {
                  let day = 0;
                  const count = self.user.registration_palata.filter(val => {
                    if (val.palata_id == el.palata_id) {
                      day += val.day;
                    }
                  }).length;
                  Statsionar.Palata.palata.push({
                    id: el.palata_id,
                    name: el.palatas != null ? el.palatas.name :"",
                    price: el.price,
                    count: day
                  });
                }
              });
            });
            localStorage.setItem("Statsionar", JSON.stringify(Statsionar));
          }
          axios({
            method: "patch",
            url: `/registration/update/` + self.$route.params.id,
            data: self.user
          }).then(res => {
            if (res) {
              let bemor = {
                fullname: self.bemor.fullname,
                type_service: self.user.type_service
              };
              localStorage.setItem("History", JSON.stringify(self.user));
              localStorage.setItem("BemorName", JSON.stringify(bemor));
              axios({
                method: "get",
                url: "/registration/pechat/" + self.user.patient_id
              }).then(res => {
                localStorage.setItem("Navbat", JSON.stringify(res.data));
                localStorage.setItem(
                  "ChekTolov",
                  JSON.stringify(self.user.registration_pay)
                );
                self.Tolov.discount = 0;
                self.summa = 0;
                self.Tolov.discount = 0;
                if (self.user.type_service == "Statsionar") {
                  self.$router.push("/user/statsionar");
                } else {
                  self.$router.push("/user");
                }
                const route = self.$router.resolve({
                  path: "/user-chek"
                });
                window.open(route.href, "_blank");
              });
              this.sending = false;
            }
            // else {
            //   this.user.pay_summa -= this.summa;
            //   this.user.discount -= this.Tolov.discount;
            //   this.user.backlog =
            //     this.user.summa + (this.summa + this.Tolov.discount);
            // }
          });
        } else if (this.$route.name == "User Profile Create") {
          axios({
            method: "post",
            url: `/registration/create`,
            data: self.user
          }).then(res => {
            if (res) {
              localStorage.setItem("History", JSON.stringify(self.user));
              axios({
                method: "get",
                url: "/registration/pechat/" + self.user.patient_id
              }).then(res => {
                localStorage.setItem(
                  "BemorName",
                  JSON.stringify(self.bemor.fullname)
                );
                localStorage.setItem("Navbat", JSON.stringify(res.data));
                localStorage.setItem(
                  "ChekTolov",
                  JSON.stringify(self.user.registration_pay)
                );
                self.Tolov.discount = 0;
                self.summa = 0;
                self.Tolov.discount = 0;
                if (self.user.type_service == "Statsionar") {
                  self.$router.push("/user/statsionar");
                } else {
                  self.$router.push("/user");
                }
                const route = self.$router.resolve({
                  path: "/user-chek"
                });
                window.open(route.href, "_blank");
              });
              this.sending = false;
            }
            // else {
            //   this.user.pay_summa -= this.summa;
            //   this.user.discount -= this.Tolov.discount;
            //   this.user.backlog =
            //     this.user.summa + (this.summa + this.Tolov.discount);
            // }
          });
        }
      } else {
        this.$bvToast.toast(`Summa xato kritildi`, {
          title: "Ogohlantirish",
          autoHideDelay: 2000,
          variant: "danger",
          appendToast: true
        });
      }
    },
    selectChange(e) {
      let self = this;
      if (e !== null) {
        // if (e.id) {
        //   axios({
        //     method: "post",
        //     url: "/registration/imtiyoz",
        //     data: {
        //       patient_id: e.id
        //     }
        //   }).then(res => {
        //     self.user.tramma_type = res.data.data;
        //   });
        // }
        this.user.patient_id = e.id;
        this.selectedBemor = e.fullname;
        this.bemor = { ...e };
        this.getRegion();
      } else {
        this.user.patient_id = null;
        this.bemor = {
          fullname: "",
          name: "",
          lastname: "",
          patronymic: "",
          region_id: null,
          district_id: null,
          phone: "",
          passport: "",
          addres: "",
          gender: "Ayol",
          imtiyoz_type: "Imtiyozsiz",
          birthday: 0
        };
        this.selectedBemor = this.bemor;
      }
    },
    RowClickedShablon(item) {
      this.user.registration_doctor.forEach(key => {
        if (key.doctor_id == item.doctor_id) {
          key.text += item.name;
          this.$bvModal.hide("modal-7");
        }
      });
    },
    RowClickedShikoyat(item) {},
    ShifokorShablon() {
      let self = this;
      self.ShablonShifokor.doctor_id = self.localUser.doctor_id;
      this.$v.$touch();
      if (this.$v.ShablonShifokor.$error == false) {
        axios({
          method: "post",
          url: "/shablon_doctor/create",
          data: self.ShablonShifokor
        }).then(res => {
          if (res != undefined) {
            self.getShablon();
            self.$bvModal.hide("modal-8");
            self.ShablonShifokor.doctor_id = 0;
            self.ShablonShifokor.name = "";
          }
        });
      } else {
        this.errorsShablon = this.$v.ShablonShifokor;
      }
    },
    ShifokorShablonClose() {
      this.$bvModal.hide("modal-8");
      this.ShablonShifokor.doctor_id = 0;
      this.ShablonShifokor.name = "";
    },
    getShablon() {
      let self = this;
      axios({
        method: "post",
        url: "/shablon_doctor/shablonOne",
        data: { doctor_id: self.localUser.doctor_id }
      }).then(res => {
        if (res != undefined) {
          self.itemsShablon = res.data.data;
        }
      });
    },
    DoriSaqlash() {
      let self = this;
      this.$v.$touch();
      if (this.$v.DorilarQoshish.$error == false) {
        axios({
          method: "post",
          url: "/pill/create",
          data: self.DorilarQoshish
        }).then(data => {
          if (data !== undefined) {
            this.getDorilar();
            this.$bvModal.hide("DorilarModal");
            this.DorilarQoshish.name = "";
          }
        });
      } else {
        this.errorsDori = this.$v.DorilarQoshish;
      }
    },
    DoriClose() {
      this.DorilarQoshish.name = "";
      this.$bvModal.hide("DorilarModal");
    },
    getPatient() {
      let self = this;
      axios({
        method: "get",
        url: "/patient/all"
      }).then(res => {
        self.items = res.data.data;
        self.totalRows = self.items.length;
      });
    },
    getNaprovitel() {
      let self = this;
      axios({
        method: "post",
        url: "/direct/filial_direct",
        data:{
          filial_id: JSON.parse(localStorage.getItem('filial_id'))
        }
      }).then(res => {
        if (res != undefined) {
          self.Naprovitel = res.data.data;
        }
      });
    },
    getShifokor() {
      let self = this;
      axios({
        method: "get",
        url: "/doctor/filial_doctor"
      }).then(res => {
        if (res != undefined) {
          self.itemsShifokor = res.data;
          self.totalRowsShifokor = self.itemsShifokor.length;
        }
      });
      // axios({
      //   method: "get",
      //   url: "/doctor/all"
      // }).then(res => {
      //   if (res != undefined) {
         
      //   }
      // });
    },
    getMkb() {
      let self = this;
      axios({
        mwethod: "get",
        url: "/info/all"
      }).then(res => {
        if (res != undefined) {
          self.mkb = res.data.data;
        }
      });
    },
    getTekshiruvlar() {
      this.spinTekshiruv = false;
      let self = this;
      axios({
        method: "get",
        url: "/inspection/filial_inspection"
      }).then(res => {
        if (res != undefined) {
          let x = [];
          res.data.data.forEach((item)=>{
            const existingType = x.find(
              r => r.name === item.name
            );
            if (existingType) {
              existingType.type.push(item);
            } else {
              x.push({ name: item.name, type: [item] });
            }
          })
          self.itemsTekshiruvlar = x;
        }
      });

      // axios({
      //   method:'get',
      //   url:'inspection/all',
      // }).then((res)=>{
      // })
    },
    getUserInspektion() {
      let self = this;
      axios({
        method: "get",
        url: "/user/all"
      }).then(res => {
        if (res != undefined) {
          res.data.data.forEach(element => {
            if (element.role == "Loborant") {
              self.Tekshiruvchi.push(element);
            }
          });
        }
      });
    },
    getDorilar() {
      let self = this;
      axios({
        method: "get",
        url: "/pill/all"
      }).then(res => {
        if (res != undefined) {
          self.itemsDorilar = res.data.data;
        }
      });
    },
    SearchDorilar(e) {
      let self = this;
      axios({
        method: "post",
        url: "/pill/search",
        data: {
          name: e
        }
      }).then(res => {
        if (res != undefined) {
          self.itemsDorilar = res.data.data;
        }
      });
    },
    getPalata() {
      let self = this;
      axios({
        method: "post",
        url: "/registration/palata",
        data: self.palata
      }).then(res => {
        if (res != undefined) {
          self.itemsPalata = res.data;
        }
      });
    },
    getRegion() {
      let self = this;
      axios({
        method: "get",
        url: "/region/all"
      }).then(res => {
        self.region = res.data.data;
        if (self.bemor.region_id !== 0) {
          for (let index = 0; index < self.region.length; index++) {
            const element = self.region[index];
            if (element.id == self.bemor.region_id) {
              self.district = element.district;
            }
          }
        }
      });
    },
    getUser_id() {
      if (
        this.$route.name == "User Profile Create" ||
        this.$route.name == "ArxivOne"
      ) {
        this.user.user_id = this.localUser.id;
        this.user_name = this.localUser.user_name;
      }
    },
    createBemor() {
      let self = this;
      this.$v.$touch();
      if (self.$v.bemor.$error == false) {
        axios({
          method: "post",
          url: "/patient/create",
          data: self.bemor
        }).then(data => {
          if (data != undefined) {
            self.items.push(data.data.data);
            self.user.patient_id = data.data.data.id;
            self.selectedBemor = data.data.data.fullname;
            this.$toast.success("malumot saqlandi", {
              timeout: 2000
            })
          }
          // else {
          //   self.$bvToast.toast(`!!!!!!!Malumotlar saqlanmadi`, {
          //     title: "Ogohlantirish",
          //     autoHideDelay: 2000,
          //     appendToast: true,
          //     variant: "danger"
          //   });
          // }
        });
      } else {
        self.errors = self.$v.bemor;
      }
    },
    updateBemor() {
      let self = this;
      if (self.$v.bemor.$error == false) {
        axios({
          method: "patch",
          url: `/patient/update/` + self.user.patient_id,
          data: self.bemor
        }).then(data => {
          if (data != undefined) {
            self.$bvToast.toast(`Малумотлар сақланди`, {
              title: "Ogohlantirish",
              autoHideDelay: 2000,
              appendToast: true
            });
          }
          // else {
          //   this.$bvToast.toast(`!!!!!!!Malumotlar saqlanmadi`, {
          //     title: "Ogohlantirish",
          //     autoHideDelay: 2000,
          //     appendToast: true,
          //     variant: "danger"
          //   });
          // }
        });
      } else {
        self.errors = self.$v.bemor;
      }
    },
    Saqlash() {
      let self = this;
      if (this.$route.name == "User Profile Create" && this.sending == false) {
        this.sending = true;
        axios({
          method: "post",
          url: "/registration/create",
          data: self.user
        }).then(res => {
          if (res && self.ChekChopEtish == false) {
            if (self.user.type_service == "Statsionar") {
              self.$router.push("/user/statsionar");
            } else {
              self.$router.push("/user");
            }
            self.sending = false;
          }
          //  else if (res && self.ChekChopEtish == true) {
          //   self.$store.state.UserError = res;
          // } else {
          //   self.sending = false;
          //   self.$store.state.UserError = res;
          // }
        });
      } else if (
        self.$route.name == "User Profile Update" &&
        self.sending == false
      ) {
        this.sending = true;
        axios({
          method: "patch",
          url: `/registration/update/` + self.$route.params.id,
          data: self.user
        }).then(res => {
          localStorage.setItem("History", JSON.stringify(self.user));
          if (res && self.ChekChopEtish == false) {
            self.sending = false;
            if (self.user.type_service == "Statsionar") {
              self.$router.push("/user/statsionar");
            } else {
              self.$router.push("/user");
            }
          }
          // else if (res != undefined && self.ChekChopEtish == true) {
          //   self.$store.state.UserError = res;
          // } else {
          //   self.sending = false;
          //   self.$store.state.UserError = res;
          // }
        });
      }
   
      // this.ChekChopEtish == false;
    },
    getUser() {
      let self = this;
      if (this.$route.name == "User Profile Update") {
        axios({
          method: "get",
          url: "/registration/one/" + this.$route.params.id
        }).then(res => {
          self.user = res.data.data;
          self.getBemor();
          self.getRegion();
          self.user_name = res.data.data.user.user_name;
          setTimeout(() => {
            self.Complate();
          }, 1000);
        });
      } else if (this.$route.name == "ArxivOne") {
        axios({
          method: "get",
          url: "/registration_arxiv/one/" + this.$route.params.id
        }).then(res => {
          self.user = res.data.data;
          self.getBemor();
          self.getRegion();
          self.user_name = res.data.data.user.user_name;
          setTimeout(() => {
            self.Complate();
          }, 1000);
        });
      }
    },
    getBemor() {
      if (
        this.$route.name == "User Profile Update" ||
        this.$route.name == "ArxivOne"
      ) {
        let self = this;
        axios({
          method: "get",
          url: "/patient/one/" + self.user.patient_id
        }).then(res => {
          self.bemor = res.data.data;
          self.selectedBemor = self.bemor;
        });
      }
    },
    PostRegion() {
      this.district = [];
      this.bemor.district_id = null;
      // if (this.$route.name == "User Profile Update") {
      for (let index = 0; index < this.region.length; index++) {
        const element = this.region[index];
        if (element.id == this.bemor.region_id) {
          this.district = element.district;
        }
      }
      // }
    },

    // linkClass(idx) {
    //   if (this.tabIndex == idx) {
    //     return ["bg-primary", "text-light"];
    //   } else {
    //     return ["bg-light", "text-info"];
    //   }
    // },
    link(index) {
      if (this.tabI === index) {
        return ["bg-primary", "text-light"];
      } else {
        return ["bg-light", "text-info"];
      }
    },
    linkClassShifokor(index) {
      if (this.tabIndexShifokor === index) {
        return ["bg-primary", "text-light"];
      } else {
        return ["bg-light", "text-info"];
      }
    },
    linkClassDorilar(index) {
      if (this.tabIndexDorilar === index) {
        return ["bg-primary", "text-light"];
      } else {
        return ["bg-light", "text-info"];
      }
    },
    cancel() {
      if (this.$route.name != "ArxivOne") {
        const x = window.confirm("Ростдан ҳам ойнани тарк этмоқчимисиз?");
        if (x) {
          if (this.user.type_service == "Statsionar") {
            this.$router.push("/user/statsionar");
          } else {
            this.$router.push("/user");
          }
        }
      } else {
        window.close();
      }
    },
    fullName() {
      this.bemor.fullname =
        this.bemor.lastname +
        " " +
        this.bemor.name +
        " " +
        this.bemor.patronymic;
    },
    rowClickMkb(child) {
      this.user.registration_doctor.forEach(x => {
        if (x.doctor_id == this.localUser.doctor_id) {
          x.text += child.name;
          x.status = "complate";
          x.register_mkb.push({
            doctor_id: x.doctor_id,
            mkb_id: child.id,
            name: child.name
          });
        }
      });
      this.mkb = [];
      this.$bvModal.hide("modal-9");
    },
    DeleteInfo(index1, index) {
      this.user.registration_doctor[index1].register_mkb.splice(index, 1);
    },
    RowClicked(items) {
      this.user.patient_id = items.id;
      this.selectedBemor = { ...items };
      this.bemor = { ...items };
      this.$bvModal.hide("modal-no-backdrop");
    },
    RowClickedPalata(items) {
      const index1 = this.user.registration_palata.findIndex(
        val => val.palata_id == items.id
      );
      if (this.vaqt != 0 && this.user.patient_id && items.status == false) {
        this.x += Number(items.price) * Number(this.vaqt);
        this.PalataSumma = this.x;
        this.user.hospital_summa = this.PalataSumma;
        this.user.summa += this.x;
        this.user.backlog += this.x;
        this.user.registration_palata.push({
          palata_id: items.id,
          price: items.price,
          palatas: { name: items.name },
          status: items.status,
          total_price: items.price * Number(this.vaqt),
          date_to: this.palata.date_to,
          day: this.vaqt,
          date_do: this.palata.date_do
        });
        this.$bvModal.hide("modal-2");
        this.$bvToast.toast(`Малумотлар сақланди`, {
          title: "Ogohlantirish",
          autoHideDelay: 2000,
          appendToast: true
        });
      } else {
        this.$bvToast.toast(`!!!!!Palata bant yoki Qolish vaqti yo'q`, {
          title: "Ogohlantirish",
          autoHideDelay: 2000,
          appendToast: true,
          variant: "danger"
        });
      }
    },
    RowClickedShifokor(item) {
      let x = 0;
      const index1 = this.user.registration_doctor.findIndex(
        val => val.doctor_id == item.id
      );
      const branchIdx = this.itemsShifokor.findIndex((branch)=> branch.id == item.filial_id);
      if (index1 == -1 && this.user.patient_id != null) {
        // item.registration_recipe = [];
        // this.doctor_id = item.id;
        if (
          this.bemor.imtiyoz_type != "Imtiyozli" &&
          this.bemor.citizen == false
        ) {
          if (this.user.tramma_type == "Bir oydan ortiq") {
            this.user.summa += Number(item.doctor_category.price);
            this.user.backlog += Number(item.doctor_category.price);
            x = Number(item.doctor_category.price);
          } else if (this.user.tramma_type == "Bir oy oralig'ida") {
            this.user.summa += Number(item.doctor_category.price) / 2;
            this.user.backlog += Number(item.doctor_category.price) / 2;
            x = Number(item.doctor_category.price) / 2;
          }
        } else if (
          this.bemor.imtiyoz_type != "Imtiyozli" &&
          this.bemor.citizen == true
        ) {
          if (this.user.tramma_type == "Bir oydan ortiq") {
            this.user.summa += Number(item.doctor_category.citizen_price);
            this.user.backlog += Number(item.doctor_category.citizen_price);
            x = Number(item.doctor_category.citizen_price);
          } else if (this.user.tramma_type == "Bir oy oralig'ida") {
            this.user.summa += Number(item.doctor_category.citizen_price) / 2;
            this.user.backlog += Number(item.doctor_category.citizen_price) / 2;
            x = Number(item.doctor_category.citizen_price) / 2;
          }
        }

        this.user.registration_doctor.push({
          doctor: {
            name: item.name,
            doctor_category: { name: item.doctor_category.name }
          },
          doctor_id: item.id,
          status: "waiting",
          price: x,
          filial_id:this.itemsShifokor[branchIdx].id,
          filial: {
             name: this.itemsShifokor[branchIdx].name
          },
          text: "",
          date_time: new Date()
            .valueOf()
            .toString()
            .slice(0, 10),
          registration_recipe: [],
          register_mkb: []
        });
        this.$bvModal.hide("modal-1");
        this.$bvToast.toast(`Малумотлар сақланди`, {
          title: "Ogohlantirish",
          autoHideDelay: 2000,
          appendToast: true
        });
      }
    },
    chooseAllow(id){
      
      const action = this.user.registration_inspection.findIndex(item => item.inspection_id == id);
      if(action == -1){
        return false
      }else{
        return true;
      }
    },
   
    RowClickedTekshiruvlar(itemsTekshiruvlar) {
      let x = 0;
      if (this.user.patient_id != null) {
        // if (this.$route.name == "User Profile Create") {
        for (
          let index = 0;
          index < itemsTekshiruvlar.inspectionChild.length;
          index++
        ) {
          const element = itemsTekshiruvlar.inspectionChild[index];
          if (this.bemor.citizen == true) {
            element.price = element.citizen_price;
          }
          if (element.checked != true) {
            element.checked = false;
            element.status = "waiting";
          }
        }
        // }
        if (this.bemor.citizen == false) {
          x = Number(itemsTekshiruvlar.price);
        } else {
          x = Number(itemsTekshiruvlar.citizen_price);
        }
        if (
          itemsTekshiruvlar.type == false &&
          this.bemor.imtiyoz_type != "Imtiyozli" &&
          this.user.tramma_type != "5 kun oralig'ida"
        ) {
          this.user.summa += x;
          this.user.backlog += x;
        }
        const testId = ()=>{
          axios({
            method: "get",
            url: `/filial/One/` + itemsTekshiruvlar.filial_id
            }).then(res => {
              this.branchName = res.data.data.name
            });
            return this.branchName
        }
        const checker = this.checkArray.findIndex((item)=> item.id == itemsTekshiruvlar.id );

        if(checker == - 1) {
          this.checkArray.push({
            checked:false,
            id:itemsTekshiruvlar.id,
            user_id: itemsTekshiruvlar.user_id,
            inspection: {
              name: itemsTekshiruvlar.name,
              percent_bonus: itemsTekshiruvlar.percent_bonus
            },
            inspection_id: itemsTekshiruvlar.id,
            price: x,
            type: itemsTekshiruvlar.type,
            category_id: itemsTekshiruvlar.category_id,
            user_id: itemsTekshiruvlar.user_id,
            filial_id: itemsTekshiruvlar.filial_id,
            filial: {name: itemsTekshiruvlar.filial ? itemsTekshiruvlar.filial.name : testId(itemsTekshiruvlar.filial_id)},
            date_time: new Date()
              .valueOf()
              .toString()
              .slice(0, 10),
            status: "waiting",
            registration_inspection_child: itemsTekshiruvlar.inspectionChild
          });

        }else{
          for(let i = 0; i < this.checkArray.length; i++){
            const element = this.checkArray[i];
            if(element.id == itemsTekshiruvlar.id){
              this.checkArray.splice(i, 1);
            } 
          }
        }
        // 
        // this.$bvModal.h.TekshiruvParentGroupside("modalPopover");
        // this.$bvToast.toast(`Malumotlar saqlandi`, {
        //   title: "Ogohlantirish",
        //   autoHideDela..TekshiruvParentGroupsy: 2000,
        //   appendToast: true
        // });
      } 
      // else if( index != -1) {.
      //     return itemsTekshiruvlar.checked = false
      // }
    },
    openTekshiruv(data){
      const idx = data.findIndex((item)=> item.id == this.localUser.filial.id);
      return idx >= 0 ? true : false
    },
    async TekshiruvBtn(){
      try{
        this.spinTekshiruv = true;
        const oldData = this.user.registration_inspection
        const newArray = this.checkArray; 
        newArray.forEach((item)=>{
          const index = oldData.findIndex((val)=> val.inspection_id == item.inspection_id);
          if(index == -1){
            this.user.registration_inspection.push(item);
          }
        })
        this.$bvModal.hide("modalPopover");
      }
      catch(e) {
        console.log(e)
      }
    },
    Complate() {
      if (this.$route.name == "User Profile Update") {
        if (this.localUser.doctor_id) {
          // let ok = true
          this.user.registration_doctor.forEach(key => {
            if (key.doctor_id == this.localUser.doctor_id) {
              key.date_time = new Date()
                .valueOf()
                .toString()
                .slice(0, 10);
              key.status = "complate";
              // if(key.status != 'complate') ok = false
            }
          });
          // if(ok) {
          //   this.us
          // }
        } else if (this.localUser.role == "Loborant") {
          this.user.registration_inspection.forEach(key => {
            if (key.user_id == this.localUser.id) {
              key.date_time = new Date()
                .valueOf()
                .toString()
                .slice(0, 10);
              key.status = "complate";
            }
          });
        }
      }
    },
    DoriName(id, index2, index1) {
      for (let index = 0; index < this.itemsDorilar.length; index++) {
        const element = this.itemsDorilar[index];
        if (element.id == id) {
          this.user.registration_doctor[index2].registration_recipe[
            index1
          ].name = element.name;
        }
      }
    },
    Add(index2) {

      this.user.registration_doctor[index2].registration_recipe.push({
        registration_doctor_id: this.localUser.doctor_id,
        pill_id: null,
        time: "",
        day: "",
        comment: "",
        name: ""
      });
    },
    downloadFile(url, index) {
      let fullPath = this.BASE_URL + url;
      fetch(fullPath)
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // the filename you want
          a.download = url;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch(() => alert("oh no!"));
    },
    onUploadTashxis() {
      let self = this;
      const formData = new FormData();
      formData.append("href", self.$refs.files.files[0]);
      axios
        .post("/upload/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          self.tashxisfile = res.data;
          if (self.$route.path != "/registration/create") {
            self.registration_id = self.$route.params.id;
          }
          self.user.registration_files.push({
            href: res.data.file,
            registration_id: self.registration_id
          });
        });
    },
    Bayonot() {
      // this.sending = true;
      if (
        this.localUser.role == "Loborant" ||
        this.localUser.role == "Shifokor" ||
        this.localUser.role == "Registrator"
      ) {
        let f = null;
        let Shifokor = null;
        let pal = {};
        this.ChekChopEtish = true;
        // this.Saqlash();
        // setTimeout(() => {
        // if (this.$store.state.UserError != undefined) {
        if (this.user.registration_doctor.length > 0) {
          for (
            let index = 0;
            index < this.user.registration_doctor.length;
            index++
          ) {
            const element = this.user.registration_doctor[index];
            if (element.doctor_id == this.localUser.doctor_id) {
              Shifokor = element;
            }
            if (this.user.registration_palata == []) {
              pal.date_to = 0;
              pal.date_do = 0;
            } else {
              for (
                let index = 0;
                index < this.user.registration_palata.length;
                index++
              ) {
                const l = this.user.registration_palata[index];
                pal.date_do = l.date_do;
                pal.date_to = l.date_do - l.day * (3600 * 24);
              }
            }
            f = {
              patient_id: this.user.patient_id,
              name: this.bemor.fullname,
              phone: this.bemor.phone,
              birthday: this.bemor.birthday,
              passport: this.bemor.passport,
              date_to: pal.date_to,
              date_do: pal.date_do,
              create_at: this.user.created_at,
              Shifokor: Shifokor,
              complaint: this.user.complaint,
              type_service: this.user.type_service
              // recipe: Shifokor.registration_recipe,
              // doctor_name: Shifokor.doctor.name
            };
            this.ChekChopEtish = false;
            localStorage.setItem("Bayonot", JSON.stringify(f));
            // this.$router.push("/user");
          }
        } else {
          f = {
            patient_id: this.user.patient_id,
            name: this.bemor.fullname,
            phone: this.bemor.phone,
            birthday: this.bemor.birthday,
            passport: this.bemor.passport,
            create_at: this.user.created_at,
            complaint: this.user.complaint,
            type_service: this.user.type_service
          };
          localStorage.setItem("Bayonot", JSON.stringify(f));
        }
        const rout = this.$router.resolve({
          path: "/user-bayonot"
        });
        window.open(rout.href, "_blank");
      } else {
        this.$toast.warning("Sizda bu huquq mavjud emas", {
          timeout: 2000
      });
      }
      // }
      // }, 500);
      // this.sending = false;
    },
    Shartnoma() {
      if (this.localUser.role == "Registrator") {
        const rout = this.$router.resolve({
          path: "/user-shartnoma"
        });
        window.open(rout.href, "_blank");
      } else {
        this.$toast.warning("Sizda bu huquq mavjud emas", {
          timeout: 2000
      });
      }
    },
    History() {
      if (this.localUser.role == "Registrator") {
        const rout = this.$router.resolve({
          path: "/HistoryPatient"
        });
        window.open(rout.href, "_blank");
      } else {
        this.$toast.warning("Sizda bu huquq mavjud emas", {
          timeout: 2000
      });
      }
    },
    Malumotnoma() {
      if (this.localUser.role == "Registrator") {
        const rout = this.$router.resolve({
          path: "/malumotnoma"
        });
        window.open(rout.href, "_blank");
      } else {
        this.$toast.warning("Sizda bu huquq mavjud emas", {
          timeout: 2000
      });
      }
    },
    Shablon1() {
      if (
        this.localUser.role == "Loborant" ||
        this.localUser.role == "Shifokor"
      ) {
        const rout = this.$router.resolve({
          path: "/user_shablon"
        });
        window.open(rout.href, "_blank");
      } else {
        this.$toast.warning("Sizda bu huquq mavjud emas", {
          timeout: 2000
      });
      }
    },
    Shablon2() {
      if (
        this.localUser.role == "Loborant" ||
        this.localUser.role == "Shifokor"
      ) {
        const rout = this.$router.resolve({
          path: "/shablon_rus"
        });
        window.open(rout.href, "_blank");
      } else {
        this.$toast.warning("Sizda bu huquq mavjud emas", {
          timeout: 2000
      });
      }
    },
    Shablon3() {
      if (
        this.localUser.role == "Loborant" ||
        this.localUser.role == "Shifokor"
      ) {
        const rout = this.$router.resolve({
          path: "/shablon_3"
        });
        window.open(rout.href, "_blank");
      } else {
        this.$toast.warning("Sizda bu huquq mavjud emas", {
          timeout: 2000
      });
      }
    },
    Shablon4() {
      if (
        this.localUser.role == "Loborant" ||
        this.localUser.role == "Shifokor"
      ) {
        const rout = this.$router.resolve({
          path: "/shablon_4"
        });
        window.open(rout.href, "_blank");
      } else {
        this.$toast.warning("Sizda bu huquq mavjud emas", {
          timeout: 2000
      });
      }
    },
    Tekshiruvlar() {
      // if ( this.localUser.role == "Shifokor" || this.localUser.role == "Loborant") {
        this.ChekChopEtish = true;
        // this.sending = true;
        let b = null;
        let y = null;
        // this.Saqlash();
        // setTimeout(() => {
        // if (this.$store.state.UserError != undefined) {
        // for (
        //   let index = 0;
        //   index < this.user.registration_inspection.length;
        //   index++
        // ) {
        //   const element = this.user.registration_inspection[index];
        //   if (this.localUser.id == element.user_id) {
        //     b = element;
        //   }
        // }
        y = {
          name: this.bemor.fullname,
          phone: this.bemor.phone,
          birthday: this.bemor.birthday,
          passport: this.bemor.passport,
          create_at: this.user.created_at,
          complaint: this.user.complaint,
          type_service: this.user.type_service,
          inspection: this.user.registration_inspection
        };
        localStorage.setItem("Tekshiruvlar", JSON.stringify(y));
        // this.$router.push("/user");
        const i = this.$router.resolve({
          path: "/user-tekshiruv"
        });
        window.open(i.href, "_blank");
      // } else {
      //   this.$toast.warning("Sizda bu huquq mavjud emas", {
      //     timeout: 2000
      // });
      // }
    },

    deleteTekshiruv(id) {
      let x = Number(this.user.registration_inspection[id].price);
      if (this.bemor.imtiyoz_type == "Imtiyozsiz") {
        this.user.summa = Number(this.user.summa) - x;
        this.user.backlog = Number(this.user.backlog) - x;
      }

      this.user.registration_inspection.splice(id, 1);
      this.checkArray.splice(id, 1);
    },
    deleteShifokor(id) {
      let x = Number(this.user.registration_doctor[id].price);
      if (this.bemor.imtiyoz_type == "Imtiyozsiz") {
        if (this.user.tramma_type == "Bir oydan ortiq") {
          this.user.summa = Number(this.user.summa) - x;
          this.user.backlog = Number(this.user.backlog) - x;
        } else if (this.user.tramma_type == "Bir oy oralig'ida") {
          this.user.summa = Number(this.user.summa) - x / 2;
          this.user.backlog = Number(this.user.backlog) - x / 2;
        }
      }

      this.user.registration_doctor.splice(id, 1);
    },
    deletePalata(id) {
      let x =
        Number(this.user.registration_palata[id].price) * Number(this.vaqt);
      this.user.summa -= x;
      this.user.backlog -= x;
      this.PalataSumma -= x;
      this.user.hospital_summa -= x;
      this.vaqt = 0;

      this.user.registration_palata.splice(id, 1);
    },
    deleteDorilar(item, id) {
      item.registration_recipe.splice(id, 1);
    },
    deleteSumma(id) {
      this.user.pay_summa -= Number(this.user.registration_pay[id].summa);
      this.user.discount -= Number(this.user.registration_pay[id].discount);
      this.user.backlog +=
        Number(this.user.registration_pay[id].summa) +
        Number(this.user.registration_pay[id].discount);
      this.user.registration_pay.splice(id, 1);
    },
    onFilteredShifokor(filteredItems) {
      this.totalRowsShifokor = filteredItems.length;
      this.currentPageShifokor = 1;
    },
    onFilteredShablon(filteredItems) {
      this.totalRowsShablon = filteredItems.length;
      this.currentPageShablon = 1;
    },
    onFilteredTekshiruvlar(filteredItems) {
      this.totalRowsTekshiruvlar = filteredItems.length;
      this.currentPageTekshiruvlar = 1;
    },
    onFilteredPalata(filteredItems) {
      this.totalRowsPalata = filteredItems.length;
      this.currentPagePalata = 1;
    },
    ChangeStatus(indexCh, indexP) {
      let Child = this.user.registration_inspection[indexP]
        .registration_inspection_child[indexCh];
      if (Child.text == "") {
        Child.status = "waiting";
      } else {
        this.user.registration_inspection[indexP].status = "complate";
        Child.status = "complate";
      }
    },
    ShifokorText(index) {
      if (this.user.registration_doctor[index].text == "") {
        this.user.registration_doctor[index].status = "waiting";
      } else {
        this.user.registration_doctor[index].status = "complate";
      }
    },
    RowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status === true) {
        return "table-danger";
      } else {
        return "table-success";
      }
    }
  },
  async mounted() {
    setInterval(() => {
      if (this.$store.state.errors != "") {
        this.$store.state.errors = "";
      }
    }, 3000);
    this.user.registration_palata
    this.getUser();
    this.getRegion();
    this.getNaprovitel();
    this.getUser_id();
    this.gethodim();
   
  }
};
</script>

<style>
/* .qidiruvselecta .vs__dropdown-menu {
  background: rgb(237, 237, 237);
  position: absolute;
  top: -68px;
} */
.radio-red{
  background: rgb(243, 26, 26);
}
.radio-green{
  background: rgb(14, 184, 14);
}

.radio-to label{
  color: #fff;
  padding: 0px 5px;
}
.radio-to{
  padding: 4px 6px;
  border-radius: 7px;
  cursor: pointer;
}
.radioDisabled{
  opacity: 0.6;
  cursor: not-allowed !important;
}
.header-action{
  display: grid;
  grid-template-columns: 0.4fr 0.8fr;
}
.table-header{
  display: flex;
  align-items: center;
}

.input-border {
  border: 1px solid rgb(210, 210, 210);
  border-radius: 3px;
  background: #fff;
}
.TekshiruvTab .vs--searchable .vs__dropdown-toggle {
  height: 40px;
}
/* .TekshiruvTab {
} */
.CreateName {
  display: block;
  float: right;
}
.LabelTekshiruvchi {
  /* font-size: 16px; */
  /* width: 40%;
  position: absolute;
  justify-content: space-between;
  top: -58px;
  right: 10px; */
  margin-bottom: 3px;
  margin-right: 20px;
  display: flex;
}
.DatePickerInput .mx-input {
  height: 40px !important;
}
.parent {
  background: #d3e4e7;
  height: 100vh;
  box-sizing: border-box;
}
.input-group > .input-group-append > .btn {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.input-group:not(.has-validation) > .form-control:not(:last-child) {
  height: 40px;
  border: 1px solid #95c2f6;
  background: #117be40b;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.tugmalarNavbar1 {
  margin: 0px auto;
  padding: 10px 7px;
  width: 99%;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
  display: flex;
  justify-content: space-between;
}
.dorilar {
  background: #f7f7f7;
  height: calc(100vh - 430px);
  overflow: auto;
}
.table-striped tbody tr {
  border-left: 4px solid #fff;
}
.table thead {
  background: #007bff;
}
.table-striped tbody tr:hover {
  background: #c5eaff;
  border-left: 4px solid #007bff;
}
.inputlarUser {
  /* display: flex; */
  padding: 5px 5px;
  width: 97%;
  border: 1px solid #fff;
  margin: 10px auto 15px auto;
  border-radius: 10px;
  justify-content: center;
  background: #00009d;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
}
.select {
  margin-top: 0px;
}
.navbarBtnDanger {
  border: 1px solid #fff;
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3);
  background: #e80a18;
  border-radius: 8px;
}
.navbarBtnTashxis {
  color: #fff;
  border: 1px solid #fff;
  padding: 3px 15px;
  background: #00009d;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  border-radius: 8px;
}
/* .navbarBtnTashxis-shkoyat{
  color: #fff;
  border: 1px solid #fff;
  padding: 2px 15px;
  background: #00009d;
  box-shadow: 5px 3px 15px rgba(25, 95, 176, 0.3);
  border-radius: 8px;
} */
.navbarBtnTashxismkb {
  color: #fff;
  border: none;
  padding: 5px 5px;
  background: #00009d;
  border-radius: 8px;
}
.navbarBtn {
  color: #fff;
  border: 1px solid #fff;
  font-size: 19px;
  font-weight: 600;
  padding: 7px 25px;
  background: #00009d;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  border-radius: 8px;
}
.navbarBtnCheckbox {
  border: 1px solid #fff;
  font-size: 19px;
  font-weight: 600;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  background: #00009d;
  border-radius: 8px;
  padding: 7px 25px;
}
.successBtn {
  box-shadow: 5px 8px 10px rgba(30, 176, 25, 0.3);
  background: #0abd11;
  border-radius: 8px;
}
.modal-content .modal-body {
  padding: 7px;
}
.spanlar {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}
.overflow {
  height: calc(100vh - 445px);
  overflow: auto;
}
.overflow1 {
  height: calc(100vh - 370px);
  overflow: auto;
}
.overflow-shkoyat {
  /* background: #fff; */
  /* border: 1px solid #c3bcbc; */
  border-radius: 3px;
  overflow: auto;
  height: calc(100vh - 320px);
}
.shifokorTable {
  height: 10px;
  background: #5077e3;
  color: #f1f1f1;
  border-radius: 4px;
}

.shirift {
  font-size: 16px;
  font-weight: 400;
}
.qidiruvselect {
  background: #fff;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}
.qidiruvselecta {
  background: #fff;
  width: 100%;
  margin-bottom: 10px;
}
.natija {
  width: 100%;
  height: 35px;
}
.TolovContent {
  margin-top: -10px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  background: rgba(7, 100, 172, 0.058823529411764705);
  border-radius: 15px;
}
.disablei {
  /* margin-right: 10px; */
  text-align: center;
  width: 20%;
  margin-bottom: 10px;
}
.disableiIzoh {
  text-align: center;
  width: 38%;
}
.disableiIzoh input {
  height: 35px;
  width: 100%;
  border: 1px solid #c3bcbc;
  border-radius: 8px;
}
.Summalar {
  display: block;
  background: #fff;
  padding: 5px 5px !important;
  border-radius: 8px;
}
.modalOverflow {
  overflow: auto;
  max-height: 350px;
  overflow-y: auto;
}
.bbbbbb .vs__dropdown-menu {
  height: 200px;
}
.selektBemor .vs__selected-options span:first-child {
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.TekshiruvchiIndex .vs__selected-options span:first-child {
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.TekshiruvchiIndex .vs__selected-options {
  width: 200px;
}
.TekshiruvchiIndex {
  width: 100%;
  background: #fff;
  border-radius: 3px;
}
.vs__selected-options span:first-child {
  width: 85% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.tablar {
  width: 97%;
  margin: 5px auto;
  height: calc(100vh - 200px);
  background: #f1f1f1;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
}
.TashxisLabel {
  display: flex;
  background: rgba(7, 101, 172, 0.345);
  border-radius: 8px;
  align-items: center;
}
.TashxisLabel label {
  padding: 2px 3px;
  margin-right: 20px;
  font-size: 17px;
  font-weight: 700;
  color: #3f51b5;
}
.card-body {
  padding: 5px 10px;
}
.modalQidiruv {
  width: 50%;
  position: relative;
  left: 50%;
}
.bemorlarinput {
  display: flex;
  justify-content: space-between;
}
.bemorlarinput .row b-form-input {
  background: #fff;
}
.tolovjadvali {
  height: 330px;
  width: 100%;
  overflow: auto;
}
.bg {
  background: #e3f0f8;
}
.trash1 {
  width: 30px;
  height: 30px;
  display: flex;
  background: #fff;
  justify-content: center;
  text-align: center;
  align-items: center;
}
.TolovSumma {
  padding: 5px 10px;
  border-radius: 15px;
  width: 17%;
  background: rgba(7, 100, 172, 0.058823529411764705);
}
.TolovSumma .numberic {
  width: 100%;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #dadada;
}
.TolovSumma .vs--searchable .vs__dropdown-toggle {
  height: 40px;
  border-radius: 8px;
}
.TolovSumma .qidiruvselecta {
  border-radius: 8px;
}
.labell {
  /* background: #007bff; */
  padding: 6px 3px;
  font-size: 19px;
  font-weight: 700;
  text-align: center;
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  width: 100%;
  color: #3f51b5;
}
.labell1 {
  /* background: #007bff; */
  padding: 3px 3px;
  font-size: 19px;
  font-weight: 700;
  width: 100%;
  color: #3f51b5;
}
.tabsBtns {
  background: #00009d;
  color: #fff;
  font-weight: 700;
  font-size: 17px;
  padding: 8px;
  border: 1px solid #fff;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.4);
  border-radius: 8px;
}
.tabsBtnsSaqlash {
  background: #00009d;
  width: 48%;
  border-radius: 8px;
  border: 1px solid #fff;
  color: #fff;
  height: 70px;
  font-size: 22px;
  font-weight: 700;
  box-shadow: 5px 8px 10px rgba(25, 60, 176, 0.4);
}
.modalBtn {
  margin-right: 7px !important;
  margin-bottom: 7px !important;
  background: #0abd11;
  box-shadow: 5px 8px 10px rgba(25, 176, 33, 0.4);
  border-radius: 8px;
}
.modalBtn1 {
  margin-right: 7px !important;
  margin-bottom: -10px !important;
  border-radius: 8px;
  background: #e80a18;
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.4);
}
.modal-content {
  border-radius: 15px !important;
}
.ChopEtish {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0px auto;
}
.ChopEtishBtn {
  color: #fff;
  border: 1px solid #fff;
  font-size: 16pt;
  margin: 5px;
  font-weight: 600;
  padding: 8px 10px;
  background: #00009d;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  border-radius: 8px;

}
.ck.ck-toolbar .ck-dropdown__panel {
  /* z-index: calc(var(--ck-z-modal) + 10); */
  position: absolute;
  top: 30px;
}
tr {
  cursor: pointer !important;
}
.color {
  background: #faa7a7d1;
}
.colorp {
  background: #90ed8fd1;
}
.mkbStyle ul {
  list-style: none;
}
@keyframes animateAlert {
  0% {
    width: 0px;
    opacity: 0;
  }
  10% {
    width: 800px;
    opacity: 1;
  }
  90% {
    width: 800px;
    opacity: 1;
  }
  100% {
    width: 0px;
    opacity: 0;
  }
}
.xatoliklar {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  /* background: rgb(255, 0, 0); */
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0;
  animation: animateAlert 3s linear;
  pointer-events: all;
}
.BemorUpdate {
  pointer-events: none;
}
.Arxive {
  pointer-events: none;
}
</style>
