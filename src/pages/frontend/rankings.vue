<template>
    trang xếp hạng
</template>
<script>
import { homeMenu } from "../../stores/home-menu.js";

export default {
    setup() {
        homeMenu().onSelectedKeys(["ranking"]);
    },
}
</script>