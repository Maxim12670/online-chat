<template>
  <div class="list-post">
    <form @submit.prevent="submitPost" class="list-post__wrapper">
      <my-input v-model="newPostContent" class="list-post__input" type="text" placeholder="Напиши новый пост"
        :isRequired="true" />
      <my-button class="list-post__btn" type="submit" text="ок" />
    </form>
    <div class="list-post__container">
      <user-post class="list-post__item" v-for="(post, index) in posts" :key="index"
        :id="post.id" :content="post.content" :date="post.date" :userId="post.userId" />
    </div>
  </div>
</template>

<script setup>
import './style.scss';
import { MyInput, MyButton } from '@/shared/ui';
import { UserPost } from '@/entities/ui/index';
import { onMounted, ref } from 'vue';
import { usePostStore } from "@/stores/postStore";

const postStore = usePostStore();
const posts = ref([]);
const newPostContent = ref('');

const submitPost = async () => {
  if (newPostContent.value !== '') {
    await postStore.addUserPost(newPostContent.value);
    newPostContent.value = '';
  }
  await postStore.getUserPosts();
}

onMounted(async () => {
  await postStore.getUserPosts();
  posts.value = postStore.postsArray;
  console.log(posts.value)
})

</script>
