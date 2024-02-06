export default {
  props: ["pages"],
  methods: {
    productList(page) {
      this.$emit("pageUpdate", page);
    },
  },
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{disabled : !pages.has_pre}">
      <a
        class="page-link"
        href="#"
        aria-label="Previous"
        @click.prevent="productList( pages.current_page - 1)"
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li
      class="page-item"
      v-for="(page, index) in pages.total_pages"
      :key="index+123"
      :class="{active : page === pages.current_page}"
    >
      <a class="page-link" href="#" @click.prevent="productList(page)"
        >{{ page }}</a
      >
    </li>
    <li class="page-item" :class="{disabled : !pages.has_next}">
      <a
        class="page-link"
        href="#"
        aria-label="Next"
        @click.prevent="productList( pages.current_page + 1)"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
};
