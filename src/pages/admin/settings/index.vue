<template>
    <div>
        <p>Đây là trang quản lý Settings</p>
    </div>
</template>
<script>
import { useMenu } from "../../../stores/use-menu.js";

export default {
    setup() {
        useMenu().onSelectedKeys(["admin-settings"]);
    },
}
</script>