<template>
    <div class="container-fluid">
        <div class="row">
            <TheHeader />
        </div>
        <div class="row">
            <TheBreadcrumb />
        </div>
        <div class="row justify-content-center">
            <router-view></router-view>
        </div>
        <div class="row">
            <TheFooter />
        </div>
    </div>
</template>

<script>
import TheHeader from "@/components/frontend/home/TheHeader.vue";
import TheBreadcrumb from "@/components/frontend/home/TheBreadcrumb.vue";
import TheFooter from "@/components/frontend/home/TheFooter.vue";
export default {
    components: {
        TheHeader,
        TheBreadcrumb,
        TheFooter,
    },
};
</script>