// renderer.js
console.log('✅ renderer.js loaded!')

// CHANGE 'window.storage' to 'window.myStorage'
const myStorage = window.myStorage  // ← CHANGED

window.saveData = (key, value) => {
    myStorage.set(key, value)  // ← CHANGED
    console.log('✅ Saved:', key, value)
}

window.loadData = async (key) => {
    const value = await myStorage.get(key)  // ← CHANGED
    console.log('📂 Loaded:', key, value)
    return value
}

window.deleteData = (key) => {
    myStorage.delete(key)  // ← CHANGED
    console.log('🗑️ Deleted:', key)
}

window.clearAllData = () => {
    myStorage.clear()  // ← CHANGED
    console.log('🧹 All cleared!')
}

window.saveData('test', 'Working!')
window.loadData('test').then(val => console.log('Test result:', val))