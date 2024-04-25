import { ref, watch } from "vue";


function searchString({ foo }) {
  const query = ref('')
  const timeoutId = ref(null)
  const result = ref(null)
  const isError = ref(false)

  watch(query, () => {
    if (timeoutId.value) clearTimeout(timeoutId.value)
    timeoutId.value = setTimeout(async() => {
        try {
          result.value = await foo(query.value)
          isError.value = false
        } catch {
          isError.value = true
        }
    }, 300)
  })

  return {
    query,
    result,
    isError
  }

}

export { searchString };