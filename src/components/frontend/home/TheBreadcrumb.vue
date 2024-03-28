<template>
    <a-breadcrumb>
        <a-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index">
            <router-link :to="crumb.to">{{ translateBreadcrumb(crumb.label) }}</router-link>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();
        const breadcrumbs = ref([]);

        const translateBreadcrumb = (label) => {
            switch (label) {
                case 'home':
                    return 'Trang chủ';
                case 'genres':
                    return 'Thể loại';
                case 'rankings':
                    return 'Xếp hạng';
                default:
                    return label;
            }
        };

        const updateBreadcrumbs = () => {
            const matchedRoutes = route.matched;
            breadcrumbs.value = matchedRoutes.map(route => ({
                label: route.meta.breadcrumb || route.name,
                to: route.path
            }));
        };

        router.afterEach(() => {
            updateBreadcrumbs();
        });

        updateBreadcrumbs();

        return {
            breadcrumbs,
            translateBreadcrumb
        };
    }
});
</script>