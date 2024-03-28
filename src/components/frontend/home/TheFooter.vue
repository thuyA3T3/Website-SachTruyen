<template>
    <a-layout-footer class="footer">
        <div class="container">
            <div class="footer__content">
                <div class="footer__brand">
                    <p>
                        <strong>Trang đọc truyện</strong>
                        <br />
                        Đây là trang web đọc truyện với kho tàng truyện tranh phong phú.
                        <br />
                        Được xây dựng bởi Đào Chung Thủy
                        <br />
                        &copy; {{ year }} Trang đọc truyện
                    </p>
                </div>
                <div class="footer__social">
                    <span>
                        <font-awesome-icon :icon="['fab', 'facebook']" />
                    </span>
                    <span>
                        <font-awesome-icon :icon="['fab', 'twitter']" />
                    </span>
                    <span>
                        <font-awesome-icon :icon="['fab', 'square-instagram']" />
                    </span>
                    <span>
                        <font-awesome-icon :icon="['fab', 'youtube']" />
                    </span>
                </div>
            </div>
        </div>
    </a-layout-footer>
</template>

<script>
import { Divider } from 'ant-design-vue';
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        Divider,
    },
    data() {
        return {
            year: new Date().getFullYear(),
        };
    },
});
</script>

<style scoped>
.footer {
    background-color: #f5f5f5;
    padding: 20px 0;
    text-align: center;
}

.footer__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

}

.footer__brand {
    flex: 0 0 50%;
    text-align: left;
}

.footer__social {
    flex: 0 0 50%;
    display: flex;
    justify-content: flex-end;
}

.footer__social span {
    margin-left: 10px;
}

@media (max-width: 768px) {

    .footer__content {
        flex-direction: column;
    }

    .footer__brand {
        text-align: center;
        order: 2;
    }

    .footer__social {
        order: 1;
    }
}
</style>
