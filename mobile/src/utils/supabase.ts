import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, KEY_URL } from '@env';
import 'react-native-url-polyfill/auto';

export const supabase = createClient(SUPABASE_URL, KEY_URL);