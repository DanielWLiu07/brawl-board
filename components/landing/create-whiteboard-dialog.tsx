"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Gamepad2,
  Users,
  Sparkles,
  Plus,
  Palette,
  AlertCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface WhiteboardGraphic {
  id: string;
  name: string;
  icon?: React.ElementType;
  imageUrl?: string;
  color: string;
  bgColor: string;
}

const whiteboardGraphics: WhiteboardGraphic[] = [
  { 
    id: "strategy", 
    name: "Strategy", 
    imageUrl: "/horsegirl_profile.png", 
    color: "text-red-600", 
    bgColor: "bg-red-100" 
  },
  { id: "team", name: "Team", icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
  { id: "game", name: "Game", icon: Gamepad2, color: "text-purple-600", bgColor: "bg-purple-100" },
  { id: "creative", name: "Creative", icon: Sparkles, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  { id: "default", name: "Default", icon: FileText, color: "text-gray-600", bgColor: "bg-gray-100" },
];

interface CreateWhiteboardDialogProps {
  children: React.ReactNode;
}

export const CreateWhiteboardDialog = ({ children }: CreateWhiteboardDialogProps) => {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [selectedGraphic, setSelectedGraphic] = useState<WhiteboardGraphic>(whiteboardGraphics[0]);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleCreate = () => {
    if (!boardName.trim()) {
      return;
    }

    const boardId = `board-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const isTemporary = !isSignedIn;

    router.push(`/board/${boardId}?name=${encodeURIComponent(boardName)}&graphic=${selectedGraphic.id}${isTemporary ? '&temp=true' : ''}`);
    setOpen(false);
    setBoardName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white border-2 border-gray-300">
        <DialogHeader>
          <DialogTitle className="text-2xl handwriting-font text-gray-800">
            Create New Whiteboard
          </DialogTitle>
          <DialogDescription className="text-gray-600 handwriting-font">
            Give your whiteboard a name and choose a style to get started
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 handwriting-font">
              Whiteboard Name
            </label>
            <Input
              placeholder="e.g., Brawl Stars Strategy, Clash Royale Defense..."
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="handwriting-font border-2 border-gray-300 focus:border-blue-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && boardName.trim()) {
                  handleCreate();
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 handwriting-font">
              Choose a Style
            </label>
            <div className="grid grid-cols-5 gap-3">
              {whiteboardGraphics.map((graphic) => {
                const Icon = graphic.icon;
                const isSelected = selectedGraphic.id === graphic.id;
                return (
                  <button
                    key={graphic.id}
                    onClick={() => setSelectedGraphic(graphic)}
                    className={`
                      flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all
                      ${isSelected 
                        ? `border-blue-600 bg-blue-50 scale-105` 
                        : `border-gray-300 bg-white hover:border-gray-400 hover:scale-105`
                      }
                    `}
                  >
                    <div className={`${graphic.bgColor} rounded-lg mb-2 overflow-hidden flex items-center justify-center ${graphic.imageUrl ? 'w-12 h-12 p-0 relative' : 'p-3 rounded-full'}`}>
                      {graphic.imageUrl ? (
                        <div className="relative w-full h-full">
                          <Image 
                            src={graphic.imageUrl} 
                            alt={graphic.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            style={{ display: 'block', position: 'relative' }}
                          />
                        </div>
                      ) : Icon ? (
                        <Icon className={`w-6 h-6 ${graphic.color}`} />
                      ) : null}
                    </div>
                    <span className={`text-xs font-medium ${isSelected ? 'text-blue-600' : 'text-gray-600'} handwriting-font`}>
                      {graphic.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {boardName && (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2 handwriting-font">Preview:</p>
              <div className="flex items-center gap-3">
                <div className={`${selectedGraphic.bgColor} rounded overflow-hidden flex items-center justify-center ${selectedGraphic.imageUrl ? 'w-10 h-10 p-0 relative' : 'p-2'}`}>
                  {selectedGraphic.imageUrl ? (
                    <div className="relative w-full h-full">
                      <Image 
                        src={selectedGraphic.imageUrl} 
                        alt={selectedGraphic.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        style={{ display: 'block', position: 'relative' }}
                      />
                    </div>
                  ) : selectedGraphic.icon ? (
                    (() => {
                      const Icon = selectedGraphic.icon;
                      return <Icon className={`w-5 h-5 ${selectedGraphic.color}`} />;
                    })()
                  ) : null}
                </div>
                <span className="font-semibold text-gray-800 handwriting-font">
                  {boardName}
                </span>
              </div>
            </div>
          )}

          {!isSignedIn && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800 handwriting-font">
                <strong>Note:</strong> Your whiteboard won't be saved. Sign in to save your work permanently.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 handwriting-font border-2 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!boardName.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 handwriting-font disabled:opacity-50"
            >
              {isSignedIn ? "Create Whiteboard" : "Create Temporary Whiteboard"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
