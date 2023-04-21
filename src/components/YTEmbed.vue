<template>
  <div
    class="video-container"
    v-if="props.url != undefined && props.url != '' && isValidURL(props.url as string)"
  >
    <iframe
      :src="formatURL(props.url as string)"
      frameborder="0"
      title="YouTube video player"
      allowfullscreen
    ></iframe>
  </div>
  <a-empty v-else :image="Empty.PRESENTED_IMAGE_SIMPLE">
    <template #description>
      <span
        >No video available, you can set a video by pressing the hamburger menu in the top
        left</span
      >
    </template>
  </a-empty>
</template>

<script setup lang="ts">
import { Empty } from 'ant-design-vue'

const props = defineProps({
  url: String
})

function formatURL(vURL: string) {
  return `https://www.youtube-nocookie.com/embed/${new URL(vURL).searchParams.get(
    'v'
  )}?autoplay=1&mute=1`
}

function isValidURL(vURL: string) {
  try {
    new URL(vURL)
  } catch (err) {
    console.error(`${vURL} errored: ${err}`)
    return false
  }
  return true
}
</script>

<style scoped>
.video-container {
  position: relative;
  padding-bottom: 50vh; /* 16:9 */
  height: 100%;
  width: 100%;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
