<template>
    trang thể loại
</template>
<script>
import { homeMenu } from "../../stores/home-menu.js";

export default {
    setup() {
        homeMenu().onSelectedKeys(["genres"]);
    },
}
</script>