<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const props = defineProps({
  table: { type: String, required: true },
  fields: { type: Array, required: true }, // [{key, label, type}]
})

const rows = ref([])
const loading = ref(true)
const saving = ref(false)

async function load() {
  loading.value = true
  const { data } = await supabase.from(props.table).select('*').order('sort_order', { ascending: true, nullsFirst: true })
  rows.value = data || []
  loading.value = false
}

function emptyRow() {
  const r = {}
  for (const f of props.fields) r[f.key] = f.type === 'boolean' ? false : ''
  r.sort_order = rows.value.length
  return r
}

function addRow() {
  rows.value.push(emptyRow())
}

async function saveRow(row) {
  saving.value = true
  const payload = { ...row }
  const isNew = !payload.id
  delete payload.id
  const query = isNew
    ? supabase.from(props.table).insert(payload).select().single()
    : supabase.from(props.table).update(payload).eq('id', row.id).select().single()
  const { data, error } = await query
  saving.value = false
  if (error) { alert(error.message); return }
  Object.assign(row, data)
}

async function deleteRow(row, idx) {
  if (row.id) {
    if (!confirm('Delete this entry?')) return
    const { error } = await supabase.from(props.table).delete().eq('id', row.id)
    if (error) { alert(error.message); return }
  }
  rows.value.splice(idx, 1)
}

onMounted(load)
</script>

<template>
  <div class="editor" v-if="!loading">
    <div v-for="(row, idx) in rows" :key="row.id || idx" class="row-card">
      <div class="fields">
        <label v-for="f in fields" :key="f.key">
          <span>{{ f.label }}</span>
          <textarea v-if="f.type === 'textarea'" v-model="row[f.key]" rows="3" />
          <input v-else-if="f.type === 'boolean'" type="checkbox" v-model="row[f.key]" />
          <input v-else-if="f.type === 'number'" type="number" v-model.number="row[f.key]" />
          <input v-else type="text" v-model="row[f.key]" />
        </label>
      </div>
      <div class="row-actions">
        <button class="save" :disabled="saving" @click="saveRow(row)">Save</button>
        <button class="delete" @click="deleteRow(row, idx)">Delete</button>
      </div>
    </div>
    <button class="add" @click="addRow">+ Add new</button>
  </div>
  <p v-else>Loading…</p>
</template>

<style scoped>
.row-card { border: 1px solid #e5e5e5; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; background: #fff; }
.fields { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem; }
label { display: flex; flex-direction: column; font-size: 0.8rem; color: #555; gap: 0.25rem; }
input, textarea { padding: 0.45rem 0.6rem; border: 1px solid #ddd; border-radius: 6px; font-size: 0.9rem; font-family: inherit; }
input[type=checkbox] { width: 18px; height: 18px; align-self: flex-start; }
.row-actions { display: flex; gap: 0.5rem; margin-top: 0.75rem; }
button { padding: 0.4rem 0.9rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 600; }
.save { background: #2563eb; color: #fff; }
.delete { background: #fee2e2; color: #b91c1c; }
.add { background: #f1f5f9; color: #333; width: 100%; padding: 0.6rem; }
</style>
