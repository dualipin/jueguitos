<script setup lang="ts">
import { ref } from 'vue'

type Colores = 'verde' | 'blanco' | 'azul'

const props = defineProps<{
  color?: Colores
}>()

const color = ref(pintar(props.color ?? 'azul'))

function pintar(color: Colores) {
  if (color == 'azul') return '#008dff'
  if (color == 'verde') return '#4CAF50'
  if (color == 'blanco') return '#FFFFFF'
}
</script>

<template>
  <div class="escena">
    <div class="burbuja">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1536"
        preserveAspectRatio="xMidYMax slice"
        style="height: inherit; width: 100%"
      >
        <g :fill="color" fill-opacity=".1" transform="translate(5 23)">
          <g id="burbuja-bottom-layer">
            <ellipse cx="6" cy="1009.5" rx="6" ry="5.5" />
            <ellipse cx="138" cy="1110.5" rx="6" ry="5.5" />
            <ellipse cx="398" cy="1055.5" rx="6" ry="5.5" />
            <ellipse cx="719" cy="1284.5" rx="6" ry="5.5" />
            <ellipse cx="760" cy="1155.5" rx="6" ry="5.5" />
            <ellipse cx="635" cy="1459.5" rx="10" ry="5.5" />
            <ellipse cx="478" cy="1335.5" rx="6" ry="5.5" />
            <ellipse cx="322" cy="1414.5" rx="6" ry="5.5" />
            <ellipse cx="247" cy="1234.5" rx="6" ry="5.5" />
            <ellipse cx="154" cy="1425.5" rx="6" ry="5.5" />
            <ellipse cx="731" cy="773.5" rx="6" ry="5.5" />
            <ellipse cx="599" cy="874.5" rx="6" ry="5.5" />
            <ellipse cx="339" cy="819.5" rx="6" ry="5.5" />
            <ellipse cx="239" cy="1004.5" rx="6" ry="5.5" />
            <ellipse cx="113" cy="863.5" rx="6" ry="5.5" />
            <ellipse cx="102" cy="1223.5" rx="6" ry="5.5" />
            <ellipse cx="395" cy="1155.5" rx="6" ry="5.5" />
            <ellipse cx="826" cy="943.5" rx="6" ry="5.5" />
            <ellipse cx="626" cy="1054.5" rx="6" ry="5.5" />
            <ellipse cx="887" cy="1366.5" rx="6" ry="5.5" />
            <ellipse cx="6" cy="241.5" rx="6" ry="5.5" />
            <ellipse cx="138" cy="342.5" rx="6" ry="5.5" />
            <ellipse cx="398" cy="287.5" rx="6" ry="5.5" />
            <ellipse cx="719" cy="516.5" rx="6" ry="5.5" />
            <ellipse cx="760" cy="387.5" rx="6" ry="5.5" />
            <ellipse cx="635" cy="691.5" rx="6" ry="5.5" />
            <ellipse cx="478" cy="567.5" rx="6" ry="5.5" />
            <ellipse cx="322" cy="646.5" rx="6" ry="5.5" />
            <ellipse cx="247" cy="466.5" rx="6" ry="5.5" />
            <ellipse cx="154" cy="657.5" rx="6" ry="5.5" />
            <ellipse cx="731" cy="5.5" rx="6" ry="5.5" />
            <ellipse cx="599" cy="106.5" rx="6" ry="5.5" />
            <ellipse cx="339" cy="51.5" rx="6" ry="5.5" />
            <ellipse cx="239" cy="236.5" rx="6" ry="5.5" />
            <ellipse cx="113" cy="95.5" rx="6" ry="5.5" />
            <ellipse cx="102" cy="455.5" rx="6" ry="5.5" />
            <ellipse cx="395" cy="387.5" rx="6" ry="5.5" />
            <ellipse cx="826" cy="175.5" rx="6" ry="5.5" />
            <ellipse cx="626" cy="286.5" rx="6" ry="5.5" />
            <ellipse cx="887" cy="598.5" rx="6" ry="5.5" />
          </g>
        </g>
        <g :fill="color" fill-opacity=".3" transform="translate(65 63)">
          <g id="burbuja-top-layer">
            <circle cx="8" cy="776" r="8" />
            <circle cx="189" cy="925" r="8" />
            <circle cx="548" cy="844" r="8" />
            <circle cx="685" cy="1115" r="8" />
            <circle cx="858" cy="909" r="8" />
            <circle cx="874" cy="1438" r="8" transform="rotate(180 874 1438)" />
            <circle cx="657" cy="1256" r="8" transform="rotate(180 657 1256)" />
            <circle cx="443" cy="1372" r="8" transform="rotate(180 443 1372)" />
            <circle cx="339" cy="1107" r="8" transform="rotate(180 339 1107)" />
            <circle cx="24" cy="1305" r="8" transform="rotate(180 24 1305)" />
            <circle cx="8" cy="8" r="8" />
            <circle cx="189" cy="157" r="8" />
            <circle cx="548" cy="76" r="8" />
            <circle cx="685" cy="347" r="8" />
            <circle cx="858" cy="141" r="8" />
            <circle cx="874" cy="670" r="8" transform="rotate(180 874 670)" />
            <circle cx="657" cy="488" r="8" transform="rotate(180 657 488)" />
            <circle cx="443" cy="604" r="8" transform="rotate(180 443 604)" />
            <circle cx="339" cy="339" r="8" transform="rotate(180 339 339)" />
            <circle cx="24" cy="537" r="8" transform="rotate(180 24 537)" />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="css">
.center {
  text-align: center;
  margin-top: 30%;
}
.white {
  color: white;
}
.escena {
  position: absolute;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
}

.burbuja {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

.burbuja svg {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100% !important;
  height: 100% !important;
}

#burbuja-bottom-layer {
  will-change: transform;
  transform: translateY(768px);
  animation: fall 12.5s infinite linear;
}

#burbuja-top-layer {
  will-change: transform;
  transform: translateY(768px);
  animation: fall 18s infinite linear;
}

#burbuja-bottom-layer-bottom {
  will-change: transform;
  transform: translate(1068px, -1368px);
  animation: fall-bottom 12.5s infinite linear;
}

#burbuja-top-layer-bottom {
  will-change: transform;
  transform: translate(1168px, -1268px);
  animation: fall-bottom 18s infinite linear;
}
@keyframes fall {
  100% {
    transform: translateY(0);
  }
}
@keyframes fall-bottom {
  100% {
    transform: translateY(0);
  }
}
</style>
