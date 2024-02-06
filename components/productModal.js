export default {
  data() {
    return {
      bsModel: "",
    };
  },
  props: ["addData", "comfirmBtn"],
  template: `<div
  id="productModal"
  ref="productModal"
  class="modal fade"
  tabindex="-1"
  aria-labelledby="productModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>新增產品</span>
        </h5>
        <button
          type="button"
          class="btn-close bg-white"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                <label for="imageUrl" class="form-label"
                  >輸入主要圖片網址</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="addData.imageUrl"
                />
              </div>
              <img class="img-fluid" :src="addData.imageUrl" alt="" />
            </div>
            <!-- 多圖判斷 -->
            <div v-if="Array.isArray(addData.imagesUrl)">
              <h5>多張圖片</h5>
              <div v-for="(img, index) in addData.imagesUrl" :key="index">
                <img :src="img" alt="" class="img-fluid" />
                <input
                  type="text"
                  class="form-control"
                  v-model="addData.imagesUrl[index]"
                />
              </div>
              <div>
                <!-- addData.imagesUrl[addData.imagesUrl.length - 1]不補上判斷代表有值 -->
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  v-if="addData.imagesUrl.length === 0 || addData.imagesUrl[addData.imagesUrl.length - 1] "
                  @click="addData.imagesUrl.push('')"
                >
                  新增圖片
                </button>
                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  v-else
                  @click="addData.imagesUrl.pop('')"
                >
                  刪除圖片
                </button>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input
                id="title"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
                v-model="addData.title"
              />
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input
                  id="category"
                  type="text"
                  class="form-control"
                  placeholder="請輸入分類"
                  v-model="addData.category"
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input
                  id="unit"
                  type="text"
                  class="form-control"
                  placeholder="請輸入單位"
                  v-model="addData.unit"
                />
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input
                  id="origin_price"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="請輸入原價"
                  v-model="addData.origin_price"
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="請輸入售價"
                  v-model="addData.price"
                />
              </div>
            </div>
            <hr />

            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                placeholder="請輸入產品描述"
                v-model="addData.description"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                placeholder="請輸入說明內容"
                v-model="addData.content"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  id="is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="addData.is_enabled"
                />
                <label class="form-check-label" for="is_enabled"
                  >是否啟用</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-dismiss="modal"
        >
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="comfirmBtn">
          確認
        </button>
      </div>
    </div>
  </div>
</div>`,
  methods: {
    openModal() {
      this.bsModel.show();
    },
    hideModal() {
      this.bsModel.hide();
    },
  },
  mounted() {
    this.bsModel = new bootstrap.Modal(this.$refs.productModal);
  },
};
