import React, { useContext, useState } from "react";
import ServerInfo, { AutoVoice, ChannelInfo } from "../../../../structure/ServerInfo";
import { FeatureType } from "../../../../utils/Cookies";
import EasyForm, { NumberElement, SelectButton } from "../../../../components/forms/Forms";
import { delAutoVoice, updateAutoVoice } from "../../../../utils/Request";
import { LocationContext } from "../../../../hooks/Browse";

export default function AutoVoiceView({ channel, guild }: { channel: ChannelInfo, guild: ServerInfo }) {
  const { channelFeatures } = useContext(LocationContext)
  const [newVoice, setNewVoice] = useState<AutoVoice | undefined>(channelFeatures?.autoVoice ? { ...channelFeatures?.autoVoice } : undefined)
  const [buttonText, setButtonText] = useState("Save changes")

  return (
    <EasyForm title="AutoVoice" feature={FeatureType.AutoVoice}>
      {newVoice === undefined ? (
        <SelectButton name={"Create new"} onClick={() => setNewVoice({ channelId: channel.id, emptyChannels: 1 })} />
      ) : (
        <>
          <NumberElement name="Empty channels" defauld={newVoice.emptyChannels} update={c => setNewVoice({ channelId: channel.id, emptyChannels: c })} minVal={1} maxVal={16} />
          <SelectButton name={buttonText} onClick={() => submit(setButtonText, guild, newVoice)}
            onDelete={() => {
              setButtonText("Deleting..."); delAutoVoice(guild, channel).then(res => {
                if (res.status === 200) setNewVoice(undefined)
                else res.text().then(setButtonText)
              });
            }}
          />
        </>
      )}
    </EasyForm>
  )
}

function submit(setButtonText: (text: string) => void, guild: ServerInfo, autoVoice: AutoVoice) {
  setButtonText("Saveing...")
  updateAutoVoice(guild.guild.id, autoVoice).then(setButtonText)
}