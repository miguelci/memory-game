<template>
    <p>{{text}}</p>
</template>
<script>
export default {
    name: 'Message',
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>