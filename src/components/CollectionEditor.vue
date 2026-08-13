<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { uploadImage } from '../lib/upload'

const props = defineProps({
  table: { type: String, required: true },
  fields: { type: Array, required: true }, // [{key, label, type}]
})

const rows = ref([])
const loading = ref(true)
const saving = ref(false)
const uploadingKey = ref(null)

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

async function onFileChange(row, key, event) {
  const file = event.target.files[0]
  if (!file) return
  uploadingKey.value = `${row.id || 'new'}-${key}`
  try {
    row[key] = await uploadImage(file, props.table)
  } catch (e) {
    alert(e.message)
  } finally {
    uploadingKey.value = null
    event.target.value = ''
  }
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
          <div v-else-if="f.type === 'image'" class="image-field">
            <img v-if="row[f.key]" :src="row[f.key]" class="preview" alt="" />
            <input type="text" v-model="row[f.key]" placeholder="Image URL, or upload →" />
            <label class="upload-btn">
              {{ uploadingKey === `${row.id || 'new'}-${f.key}` ? '…' : 'Upload' }}
              <input type="file" accept="image/*" hidden @change="onFileChange(row, f.key, $event)" />
            </label>
          </div>
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
  <p v-else class="loading-text">Loading…</p>
</template>

<style scoped>
.loading-text { color: var(--muted); font-size: 0.9rem; }
.row-card { border: 1px solid var(--line); border-radius: 10px; padding: 1.1rem; margin-bottom: 1rem; background: var(--panel); }
.fields { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.9rem; }
label { display: flex; flex-direction: column; font-size: 0.78rem; color: var(--muted); gap: 0.3rem; }
input, textarea {
  padding: 0.5rem 0.65rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: 'Bricolage Grotesque', sans-serif;
  background: var(--bg);
  color: var(--ink);
}
input:focus, textarea:focus { outline: none; border-color: var(--accent); }
input[type=checkbox] { width: 18px; height: 18px; align-self: flex-start; }
.image-field { display: flex; flex-direction: column; gap: 0.4rem; }
.image-field .preview { width: 100%; height: 90px; object-fit: cover; border-radius: 8px; border: 1px solid var(--line); }
.upload-btn { text-align: center; background: var(--ink); color: var(--bg); padding: 0.4rem; border-radius: 8px; cursor: pointer; font-size: 0.78rem; }
.row-actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
button { padding: 0.45rem 0.9rem; border: 1px solid var(--line); border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 600; background: var(--panel); color: var(--ink); }
.save { background: var(--ink); border-color: var(--ink); color: var(--bg); }
.delete { color: #a4321f; }
.delete:hover { background: #fbe9e4; border-color: #f0997b; }
.add { background: transparent; border: 1px dashed var(--line); color: var(--muted); width: 100%; padding: 0.6rem; }
</style>
