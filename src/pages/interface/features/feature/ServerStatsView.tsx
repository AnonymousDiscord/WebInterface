import React, { useContext, useState } from "react";
import { ChannelType } from "../../../../structure/ChannelType";
import ServerInfo, { ChannelInfo, placeholderValues, ServerStat } from "../../../../structure/ServerInfo";
import { FeatureType } from "../../../../utils/Cookies";
import EasyForm, { SelectButton, SelectElement, TextElement } from "../../../../components/forms/Forms";
import { delStats, updateServerStat } from "../../../../utils/Request";
import { LocationContext } from "../../../../hooks/Browse";

export default function ServerStats({ channel, guild }: { channel: ChannelInfo, guild: ServerInfo }) {
  const { channelFeatures } = useContext(LocationContext)
  const stats = channelFeatures?.serverStats
  const [newStats, setNewStats] = useState<ServerStat | undefined>(stats ? { ...stats } : undefined)
  const [buttonText, setButtonText] = useState("Save changes")

  return (
    <EasyForm title="ServerStats" feature={FeatureType.ServerStats}>
      {newStats === undefined ? (
        <SelectButton name={"Create new"} onClick={() => setNewStats({ channelId: channel.id, name: channel.name, placeholder: "MEMBERS" })} />
      ) : (
        <>
          <TextElement name="ChannelName" defauld={newStats.name} update={c => setNewStats({ channelId: channel.id, name: c, placeholder: newStats.placeholder, role: newStats.role })} checkError={text => text.split("%").length === 2 ? undefined : "Name must contain exactly one %"} formateText={ChannelType.getNameFormatter(channel.type)} />
          <SelectElement name="Placeholder" defauld={newStats.placeholder} types={placeholderValues} updateSelected={c => setNewStats({ channelId: channel.id, name: newStats.name, placeholder: c, role: newStats.role })} />
          <SelectElement name="Role" defauld={newStats.role} show={newStats.placeholder === "ROLE"} options={guild.roles.map(c => ({ id: c.id, name: c.name }))} updateSelected={c => setNewStats({ channelId: channel.id, name: newStats.name, placeholder: newStats.placeholder, role: c })} />
          <SelectButton name={buttonText} onClick={() => submit(setButtonText, guild, newStats)}
            onDelete={() => {
              setButtonText("Deleting..."); delStats(guild, channel).then(res => {
                if (res.status === 200) setNewStats(undefined)
                else res.text().then(setButtonText)
              });
            }}
          />
        </>
      )}
    </EasyForm>
  )
}

function submit(setButtonText: (text: string) => void, guild: ServerInfo, serverStat: ServerStat) {
  const stat = { ...serverStat };
  if (stat.placeholder === "ROLE") {
    if (stat.role === undefined) stat.role = guild.roles[0].id;
  } else {
    stat.role = undefined;
  }

  setButtonText("Saveing...")
  updateServerStat(guild.guild.id, stat).then(setButtonText)
}