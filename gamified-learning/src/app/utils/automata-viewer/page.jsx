import AutomatonGraph from "./automaton-graph";

export default function AutomatonViewer() {
    return(
        <div>
        <AutomatonGraph 
            words={["TCP", "UDP", "ARP", "IP", "ICMP", "HTTP", "DHCP", "FTP", "TFTP", "SMTP", "POP"]}
            showStateLabel={false}
        />

        </div>
    );
}