<template>
    <Tabs>
        <TabPane label="macOS" icon="social-apple">标签一的内容</TabPane>
        <TabPane label="Windows" icon="social-windows">标签二的内容</TabPane>
        <TabPane label="Linux" icon="social-tux">标签三的内容</TabPane>
    </Tabs>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
