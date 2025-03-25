<script setup lang="ts">
import { ref } from 'vue'

const activeElement = ref('Dashboard')

const items = [
  { title: 'Dashboard', icon: 'dashboard', to: { name: 'dashboard' } },
  {
    title: 'Reportes',
    icon: 'bar_chart',
  },
]
</script>
<template>
  <div class="flex min-h-screen md:flex-row flex-col">
    <div>
      <VaSidebar>
        <VaSidebarItem class="mb-10">
          <VaSidebarItemContent>
            <VaIcon name="va-check" />
            <VaSidebarItemTitle class="text-2xl font-semibold">Mi Química</VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
        <VaAccordion>
          <template v-for="item in items">
            <VaCollapse v-if="item.children" :key="item.title + 'collapse'" body-color="#00000022">
              <template #header="{ value: isCollapsed }">
                <VaSidebarItem
                  :active="item.children.some((child) => child.title === activeElement)"
                >
                  <VaSidebarItemContent>
                    <VaIcon :name="item.icon" />
                    <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
                    <VaSpacer />
                    <VaIcon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
                  </VaSidebarItemContent>
                </VaSidebarItem>
              </template>

              <template #body>
                <VaSidebarItem
                  v-for="child in item.children"
                  :key="child.title"
                  :active="child.title === activeElement"
                  @click="activeElement = child.title"
                >
                  <VaSidebarItemContent>
                    <VaIcon :name="child.icon" />
                    <VaSidebarItemTitle>{{ child.title }}</VaSidebarItemTitle>
                  </VaSidebarItemContent>
                </VaSidebarItem>
              </template>
            </VaCollapse>

            <VaSidebarItem
              v-else
              :key="item.title + 'item'"
              :active="item.title === activeElement"
              @click="activeElement = item.title"
            >
              <VaSidebarItemContent>
                <VaIcon :name="item.icon" />
                <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
              </VaSidebarItemContent>
            </VaSidebarItem>
          </template>
        </VaAccordion>

        <VaSpacer />

        <VaSidebarItem :active="'Settings' === activeElement" @click="activeElement = 'Settings'">
          <VaSidebarItemContent>
            <VaIcon name="home" />
            <VaSidebarItemTitle>
              <RouterLink :to="{ name: 'periodica' }">Pagina Principal</RouterLink>
            </VaSidebarItemTitle>
          </VaSidebarItemContent>
        </VaSidebarItem>
      </VaSidebar>
    </div>
    <div class="flex-1 p-5 flex flex-col">
      <RouterView />
    </div>
  </div>
</template>
