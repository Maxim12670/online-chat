<template>
  <div class="list-post">
    <form @submit.prevent="submitPost" class="list-post__wrapper">
      <my-input v-model="newPostContent" class="list-post__input" type="text" placeholder="Напиши новый пост"
        :isRequired="true" />
      <my-button class="list-post__btn" type="submit" text="ок" />
    </form>
    <loader-content v-if="!loadedPosts" class="list-post__loader"/>
    <div v-else class="list-post__container">
      <not-data-stub v-if="!posts" text="Постов нет!"/>
      <user-post v-else class="list-post__item" v-for="(post, index) in posts" :key="index" :id="post.id" :name="post.name"
        :image="post.image" :surname="post.surname" :content="post.content" :date="post.date"
        @delete-current-post="deleteCurrentPost" />
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { onMounted, ref } from 'vue';
import { MyInput, MyButton, NotDataStub, LoaderContent } from '@/shared/ui';
import { UserPost } from '@/entities/ui/index';
import { usePostStore } from "@/stores/postStore";

const postStore = usePostStore();
const posts = ref([]);
const newPostContent = ref('');
const loadedPosts = ref(false);

async function getPosts() {
  posts.value = await postStore.getUserPosts();
  loadedPosts.value = true;
}

const submitPost = async () => {
  if (newPostContent.value !== '') {
    await postStore.addUserPost(newPostContent.value);
    newPostContent.value = '';
  }
  await getPosts();
}

const deleteCurrentPost = async (id) => {
  await postStore.deleteUserPost(id);
  await getPosts()
}

onMounted(async () => {
  await getPosts();
})

</script>
