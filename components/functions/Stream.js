import { useLivepeerProvider } from "@livepeer/react";
import { useCreateStream, createStream } from '@livepeer/react';
import {useState} from "react";



export default function Screen() {
const provider = useLivepeerProvider();
const [streamName, setStreamName] = useState();

const {
    mutate: createStream,
    data: stream,
} = useCreateStream({
    name: streamName,
})
    return (
        <div className="Screen"><h1>Config Stream</h1>
        <input className="input1" onChange={ (e) => setStreamName(e.target.value)}/>
        <button className="button1"
        onClick={()=> {createStream?.();}}>Create Stream</button>
        {stream && <div className="renderKey">
            <p> <strong>stream Key:</strong> {stream.streamKey}</p>
            <p> <strong>stream Name:</strong>e: {stream.name}</p>
            <p> <strong>stream Id:</strong>{stream.playbackId}</p>

        </div> }
        </div>
        
    );
}