import React, { useEffect, useState } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import * as SahhaModule from 'sahha-react-native'

// Try to get Sahha and SahhaEnvironment in a safe way
const Sahha: any =
  (SahhaModule as any).Sahha ??
  (SahhaModule as any).default ??
  SahhaModule

const SahhaEnvironment: any =
  (SahhaModule as any).SahhaEnvironment ??
  (SahhaModule as any).default?.SahhaEnvironment

export default function SahhaTestScreen() {
  const [logLines, setLogLines] = useState<string[]>([])

  const addLog = (message: string) => {
    console.log(message)
    setLogLines(prev => [...prev, message])
  }

  useEffect(() => {
    addLog('Sahha module keys: ' + Object.keys(SahhaModule).join(', '))

    if (!Sahha) {
      addLog('Sahha object is undefined or null')
      return
    }

    if (typeof Sahha.configure !== 'function') {
      addLog('Sahha.configure is NOT a function')
    } else {
      addLog('Sahha.configure is a function')
    }
  }, [])

  const runSahhaTest = () => {
    if (!Sahha || typeof Sahha.configure !== 'function') {
      addLog('Cannot run test because Sahha.configure is missing')
      return
    }

    const settings = {
      // Fallback to 0 just in case, but sandbox should exist
      environment: SahhaEnvironment?.sandbox ?? 0,
    }

    Sahha.configure(settings, (error: string | null, success: boolean) => {
      if (error) {
        addLog('Sahha configure error: ' + error)
        return
      }
      addLog('Sahha configured: ' + String(success))

      Sahha.authorize((authError: string | null, authSuccess: boolean) => {
        if (authError) {
          addLog('Sahha authorisation error: ' + authError)
          return
        }
        addLog('Sahha authorised: ' + String(authSuccess))

        Sahha.getBiometrics((bioError: string | null, biometrics: any) => {
          if (bioError) {
            addLog('Sahha biometrics error: ' + bioError)
            return
          }
          addLog('Sahha biometrics: ' + JSON.stringify(biometrics))
        })
      })
    })
  }

  return (
    <View style={{ flex: 1, padding: 16, paddingTop: 60 }}>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16 }}>
        Sahha Test Screen
      </Text>

      <Button title="Run Sahha test" onPress={runSahhaTest} />

      <ScrollView style={{ marginTop: 16 }}>
        {logLines.map((line, index) => (
          <Text key={index} style={{ fontSize: 12, marginBottom: 4 }}>
            {line}
          </Text>
        ))}
      </ScrollView>
    </View>
  )
}

