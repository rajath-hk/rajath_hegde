'use client';

import React, { useState, useEffect } from 'react';
import { useWindows } from '@/contexts/window-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

const USER_PROFILE_STORAGE_KEY = 'portfolio-user-profile';

const UserProfileManager = () => {
  const { windows } = useWindows();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile | null>(null);

  // Load profile from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedProfile = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setProfile(parsed);
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save profile to localStorage on change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (profile) {
      localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } else {
      localStorage.removeItem(USER_PROFILE_STORAGE_KEY);
    }
  }, [profile]);

  const handleEdit = () => {
    setTempProfile(profile);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setTempProfile(null);
  };

  const handleSave = () => {
    if (tempProfile) {
      setProfile(tempProfile);
      setEditMode(false);
      setTempProfile(null);
      toast({
        title: 'Profile Saved',
        description: 'Your profile has been updated successfully.',
      });
    }
  };

  const handleExport = () => {
    if (!profile || typeof window === 'undefined' || typeof document === 'undefined') return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "user-profile.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedProfile = JSON.parse(event.target?.result as string);
        // Basic validation
        if (importedProfile.id && importedProfile.name && importedProfile.email && importedProfile.preferences) {
          setProfile(importedProfile);
          setEditMode(false);
          setTempProfile(null);
          toast({
            title: 'Profile Imported',
            description: 'Your profile has been imported successfully.',
          });
        } else {
          throw new Error('Invalid profile structure');
        }
      } catch {
        toast({
          title: 'Import Failed',
          description: 'The selected file is not a valid profile.',
          variant: 'destructive',
        });
      }
    };
    reader.readAsText(file);
  };

  const handleChange = (key: keyof UserProfile | `preferences.${keyof UserProfile['preferences']}`, value: any) => {
    if (!tempProfile) return;
    if (key.startsWith('preferences.')) {
      const prefKey = key.split('.')[1] as keyof UserProfile['preferences'];
      setTempProfile({
        ...tempProfile,
        preferences: {
          ...tempProfile.preferences,
          [prefKey]: value,
        },
      });
    } else {
      setTempProfile({ ...tempProfile, [key as keyof UserProfile]: value });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-background/80 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
      
      {!editMode && profile ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{profile.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{profile.email}</span>
          </div>
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Preferences</h3>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Theme</span>
              <span className="font-medium capitalize">{profile.preferences.theme}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Notifications</span>
              <span className="font-medium">{profile.preferences.notifications ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={handleEdit}>Edit Profile</Button>
            <Button variant="outline" onClick={handleExport}>Export</Button>
            <Button variant="outline" asChild>
              <label htmlFor="import-profile" className="cursor-pointer">
                Import
                <input
                  id="import-profile"
                  type="file"
                  accept="application/json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); handleSave(); }}
          className="space-y-6"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={tempProfile?.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={tempProfile?.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="theme-select">Theme</Label>
                {/* A real implementation would use a select or radio group */}
                <span className="text-sm text-muted-foreground">Dark theme coming soon!</span>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications-switch">Enable Notifications</Label>
                <Switch
                  id="notifications-switch"
                  checked={tempProfile?.preferences.notifications || false}
                  onCheckedChange={(checked) => handleChange('preferences.notifications', checked)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit">Save Changes</Button>
            {profile && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      )}

      {!profile && !editMode && (
        <div className="text-center text-muted-foreground py-8">
          <p>No user profile found.</p>
          <Button className="mt-4" onClick={() => {
            setTempProfile({
              id: Date.now().toString(),
              name: '',
              email: '',
              preferences: { theme: 'light', notifications: true }
            });
            setEditMode(true);
          }}>
            Create a Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfileManager;
