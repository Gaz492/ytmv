<template>
  <a-dropdown>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1" @click="showShareModal">
          <share-alt-outlined /> Share Views
        </a-menu-item>
        <a-menu-item key="2">
          <a-popconfirm
            placement="right"
            title="Are you sure you want to clear views?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="clearStreams"
          >
            <delete-outlined /> Clear Views
          </a-popconfirm>
        </a-menu-item>
      </a-menu>
    </template>
    <a-button type="primary" size="large" class="settingBtn" @click="showSettingsModal = true">
      <template #icon>
        <menu-outlined />
      </template>
    </a-button>
  </a-dropdown>
  <a-row type="flex" :wrap="false">
    <a-col flex="auto" style="display: flex; align-items: center; justify-content: center">
      <YTEmbed :url="streams.stream1" />
    </a-col>
    <a-col flex="auto" style="display: flex; align-items: center; justify-content: center">
      <YTEmbed :url="streams.stream2" />
    </a-col>
  </a-row>
  <a-row type="flex" :wrap="false">
    <a-col flex="auto" style="display: flex; align-items: center; justify-content: center">
      <YTEmbed :url="streams.stream3" />
    </a-col>
    <a-col flex="auto" style="display: flex; align-items: center; justify-content: center">
      <YTEmbed :url="streams.stream4" />
    </a-col>
  </a-row>
  <!-- Settings modal -->
  <a-modal
    v-model:visible="showSettingsModal"
    title="Stream Settings"
    @ok="handleOk"
    :footer="null"
  >
    <a-form-item>
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item
              :key="index"
              v-for="(preset, index) in presets.presets"
              @click="loadPreset(index)"
            >
              {{ preset.name }}
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          Load Preset
          <down-outlined />
        </a-button>
      </a-dropdown>
    </a-form-item>
    <a-form-item label="Stream 1" name="stream1">
      <a-input v-model:value="streams.stream1" @change="debounce" />
    </a-form-item>
    <a-form-item label="Stream 2" name="stream2">
      <a-input v-model:value="streams.stream2" @change="debounce" />
    </a-form-item>
    <a-form-item label="Stream 3" name="stream3">
      <a-input v-model:value="streams.stream3" @change="debounce" />
    </a-form-item>
    <a-form-item label="Stream 4" name="stream4">
      <a-input v-model:value="streams.stream4" @change="debounce" />
    </a-form-item>
    <a-divider>Save as preset</a-divider>
    <a-input-group compact>
      <a-input
        v-model:value="presetName"
        placeholder="Preset name"
        style="width: calc(100% - 63px)"
      />
      <a-button type="primary" @click="savePreset">Save</a-button>
    </a-input-group>
  </a-modal>
  <!-- Share link modal -->
  <a-modal v-model:visible="showShareLinkModal" title="Share link" @ok="hideShareModal">
    <template #footer>
      <a-button key="back" @click="hideShareModal">Ok</a-button>
    </template>
    <a-input-group compact>
      <a-input :default-value="shareLink" style="width: calc(100% - 32px)" />
      <a-tooltip title="Copy share link">
        <a-button @click="shareLayoutCopy">
          <template #icon><CopyOutlined /></template>
        </a-button>
      </a-tooltip>
    </a-input-group>
  </a-modal>
</template>

<script setup lang="ts">
import {
  MenuOutlined,
  CopyOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import YTEmbed from '@/components/YTEmbed.vue'
import type { FourViewPresets, FourViewStreams } from '@/types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import copy from 'copy-text-to-clipboard'
import { notification } from 'ant-design-vue'

const route = useRoute()
const presets = ref<FourViewPresets>({ presets: [] })
const streams = ref<FourViewStreams>({
  stream1: '',
  stream2: '',
  stream3: '',
  stream4: ''
})
const showSettingsModal = ref<boolean>(false)
const showShareLinkModal = ref<boolean>(false)
const shareLink = ref<string>()
const timer = ref<number>(0)
const presetName = ref<string>('')

onMounted(() => {
  const savedStreams = localStorage.getItem('savedStreams')
  const savedPresets = localStorage.getItem('fourViewPresets')
  if (savedStreams !== null && !route.query.s) {
    // const parsedStreams = JSON.parse(savedStreams)
    streams.value = JSON.parse(savedStreams)
  } else if (route.query.s) {
    streams.value = JSON.parse(atob(route.query.s.toString()))
  }

  if (savedPresets !== null && savedPresets !== '') {
    presets.value = JSON.parse(savedPresets)
  }
})

const debounce = () => {
  clearTimeout(timer.value)
  timer.value = setTimeout(() => {
    streamsChanged()
  }, 500)
}

function streamsChanged() {
  // console.log('Saving settings');
  localStorage.setItem('savedStreams', JSON.stringify(streams.value))
}

const handleOk = () => {
  showSettingsModal.value = false
}

const showShareModal = () => {
  shareLink.value = shareLinkGen()
  showShareLinkModal.value = true
}
const hideShareModal = () => {
  showShareLinkModal.value = false
}

function shareLinkGen() {
  return `https://ytmv.wuffs.dev/?s=${btoa(JSON.stringify(streams.value))}`
}

const shareLayoutCopy = () => {
  const encodedView = shareLinkGen()
  if (copy(encodedView)) {
    notification['success']({
      message: 'Copied link to clipboard',
      description: 'Copied sharing link to clipboard'
    })
    hideShareModal()
  } else {
    notification['error']({
      message: 'Unable to copy link to clipboard',
      description: 'There was an error copying the sharing link to your clipboard'
    })
  }
}

function clearStreams() {
  streams.value = {} as FourViewStreams
  streamsChanged()
}

function loadPreset(index: number) {
  console.log(`Loading preset ${presets.value.presets[index].name}`)
  console.log(presets.value.presets[index].views)
  streams.value = presets.value.presets[index].views
  streamsChanged()
}

function savePreset() {
  const currentViews: Partial<FourViewStreams> = {}
  Object.assign(currentViews, streams.value)
  presets.value.presets.push({
    name: presetName.value,
    views: currentViews as FourViewStreams
  })
  localStorage.setItem('fourViewPresets', JSON.stringify(presets.value))
  presetName.value = ''
}
</script>

<style scoped>
.ant-row {
  height: 50%;
}
.ant-col {
  min-width: 50% !important;
  /*background-color: #00aeff;*/
}

.settingBtn {
  position: fixed;
  z-index: 999;
  margin-left: 5px;
  margin-top: 5px;
  width: 100%;
}
</style>
