import { supabase } from './supabase'

export async function uploadImage(file, folder = 'misc') {
  const ext = file.name.split('.').pop()
  const path = `${folder}/${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('portfolio-media').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('portfolio-media').getPublicUrl(path)
  return data.publicUrl
}
