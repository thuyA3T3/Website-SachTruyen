<template>
    trang tai khoan
</template>
<script>
import { homeMenu } from "../../stores/home-menu.js";

export default {
    setup() {
        homeMenu().onSelectedKeys(["account"]);
    },
}
</script>