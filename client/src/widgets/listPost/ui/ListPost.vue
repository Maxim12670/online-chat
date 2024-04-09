<template>
  <div class="list-post">
    <form @submit.prevent="submitPost" class="list-post__wrapper">
      <my-input v-model="newPostContent" class="list-post__input" type="text"
        placeholder="Напиши новый пост"
        :isRequired="true" />
      <my-button class="list-post__btn" type="submit" text="ок" />
    </form>
    <div class="list-post__container">
      <user-post class="list-post__item" v-for="(post, index) in posts" :key="index"
        @delete-current-post="deleteCurrentPost" :id="post.id" :content="post.content" :date="post.date" :userId="post.userId" />
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { onMounted, ref, toRefs } from 'vue';
import { MyInput, MyButton } from '@/shared/ui';
import { UserPost } from '@/entities/ui/index';
import { usePostStore } from "@/stores/postStore";

const postStore = usePostStore();
const posts = ref([]);
const newPostContent = ref('');

const submitPost = async () => {
  if (newPostContent.value !== '') {
    await postStore.addUserPost(newPostContent.value);
    newPostContent.value = '';
  }
  posts.value = await postStore.getUserPosts();
}

async function deleteCurrentPost(id) {
  await postStore.deleteUserPost(id);
  console.log('delete post')
  posts.value = await postStore.getUserPosts();
}

onMounted(async () => {
  posts.value = await postStore.getUserPosts();
})

</script>
