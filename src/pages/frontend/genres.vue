<template>
    <div class="container">
        <div class="flex">
            <button>
                danh muc
            </button>
        </div>
    </div>
</template>
<script>
import { homeMenu } from "../../stores/home-menu.js";

export default {
    setup() {
        homeMenu().onSelectedKeys(["genres"]);
    },
}
</script>