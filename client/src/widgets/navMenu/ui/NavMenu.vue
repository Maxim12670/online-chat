<template>
  <nav class="nav-menu">
    <SpriteSVG />
    <ul class="nav-menu__list">
      <li class="nav-menu__item" v-for="link in navLinks" :key="link.label">

        <svg class="nav-menu__icon">
          <use :xlink:href="link.idIcon"></use>
        </svg>

        <div class="nav-menu__text">
          <span>{{ link.label }}</span>
        </div>

      </li>
    </ul>
  </nav>
</template>

<script setup>
import './style.scss';
import { SpriteSVG } from '../../../shared/ui/index.js';
import { navLinks } from '../config/navLinks';


</script>