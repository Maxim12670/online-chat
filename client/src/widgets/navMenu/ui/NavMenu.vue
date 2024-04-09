<template>
  <nav class="nav-menu">
    <SpriteSVG />
    <div class="nav-menu__list">
      <router-link :to="link.path" class="nav-menu__item" v-for="link in navLinks" :key="link.label">
          <svg class="nav-menu__icon">
            <use :xlink:href="link.idIcon"></use>
          </svg>
          <div class="nav-menu__text">
            <span>{{ link.label }}</span>
          </div>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import './style.scss';
import { SpriteSVG } from '../../../shared/ui/index.js';
import { navLinks } from '../config/navLinks';


</script>