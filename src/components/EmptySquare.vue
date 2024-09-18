<script setup lang="ts">
type EmptySquareProps = {
  highlight?: boolean
}

defineProps<EmptySquareProps>()
</script>

<template>
  <div :class="['empty-square', highlight && 'highlight']" />
</template>

<style lang="scss" scoped>
.empty-square {
  height: 100%;
  width: 100%;

  &.highlight {
    background-color: var(--c-highlight);
    opacity: 0.4;
  }
}
</style>